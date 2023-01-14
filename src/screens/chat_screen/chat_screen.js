import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../../components/navBar/navBar";
import { db } from "../../utils/firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import axios from "axios";
import apiEndpoint from "../../utils/api";

export default function ChatScreen() {
  const { roomId, uid } = useParams();
  const [messages, setMessages] = useState([]);

  let patientUID = roomId.toString();
  patientUID = patientUID.replaceAll(`${uid.toString()}`, "");

  const collectionRef = collection(db, `chats/${roomId}/messages`);
  const docCollectionRef = doc(db, `doctors/${uid}/chats/${roomId}`);
  const patientCollectionRef = doc(db, `users/${patientUID}/chats/${roomId}`);

  const navigate = useNavigate();
  useEffect(() => {
    const validate = async (accessToken) => {
      await axios({
        method: "POST",
        url: `${apiEndpoint}auth/validateToken`,
        data: {
          accessToken: accessToken,
        },
      })
        .then((res) => {
          if (res.data === "not authenticated") {
            navigate(`/login`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
  }, [navigate]);



  useEffect(() => {
    const unsubscribe = async () => {
      const data = getDocs(query(collectionRef, orderBy("createdOn", "asc")));
      setMessages(
        (await data).docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };

    unsubscribe();
  }, [collectionRef, messages]);

  async function handleSubmit(event) {
    event.preventDefault();
    const message = event.target.elements.message.value;
    event.target.elements.message.value = "";
    await addDoc(collectionRef, {
      message: message,
      senderName: "Doctor",
      senderUID: uid,
      createdOn: firebase.firestore.Timestamp.now(),
    });

    await setDoc(docCollectionRef, {
      lastMessage: message,
      receiverUID: uid,
    });

    await setDoc(patientCollectionRef, {
      lastMessage: message,
      receiverUID: uid,
    });
  }

  return (
    <>
      <NavBar />
      <div
        style={{ margin: "10px", padding: "10px", backgroundColor: "#f2f2f2" }}
      >
        <ul style={{ listStyleType: "none", padding: "0px" }}>
          {messages.map(({ id, message, senderUID }) => (
            <li
              key={id}
              style={{
                margin: "5px",
                padding: "5px",
                backgroundColor: "white",
                textAlign: senderUID === uid ? "right" : "left",
              }}
            >
              {message}
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <input
            name="message"
            placeholder="Type your message here"
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button
            style={{
              padding: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
