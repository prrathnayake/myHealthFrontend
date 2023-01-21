import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import apiEndpoint from "../../utils/api";
import { db } from "../../utils/firebase.js";

export default function ChatListScreen() {
  const [chats, setChats] = useState([]);
  const [uid, setUid] = useState([]);

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
  },[navigate]);



  const getChatDetails = async () => {
    const id = JSON.parse(localStorage.getItem("id"));
    await axios({
      method: "GET",
      url: `${apiEndpoint}chat/?id=${id}`
    })
      .then((res) => {
        setUid(res.data[0].firebaseUID !== undefined || null || '' ? res.data[0].firebaseUID:'no uid');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {

    const unsubscribe = async () => {
      console.log('firebase read');
      if (uid === 'no uid') return console.log('no chats')
      const collectionRef = collection(db, `doctors/${uid}/chats`);
      const data = getDocs(collectionRef);
      setChats(
        (await data).docs.map((doc) => {
          return {...doc.data(), id:doc.id};
        })
      );
    };
    getChatDetails();
    unsubscribe();

  },[uid]);

  return (
    <>
      {" "}
      <NavBar />
      <div>
        <ul>
          {chats.length === 0 ? <h2 className="notAvailableMessage">No chats available</h2> :chats.map(({ id,receiverName }) => (
            <li key={id}>
              <Link to={`/chatScreen/${id}/${uid}`}>{receiverName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
