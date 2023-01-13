import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "../../components/navBar/navBar";
import "./home_screen.css";
import axios from "axios";
import apiEndpoint from "../../utils/api";

export default function HomeScreen() {
  const navigate = useNavigate();
  let slideIndex = 0;

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
    showSlides();
  });

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

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("panel-image");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
  }

  return (
    <>
      <NavBar />
      <div className="home-screen">
        <div>
          {" "}
          <p className="">Welcome</p>
        </div>
        <div className="home-image-panel">
          <div className="image-panel">
            <img
              className="panel-image"
              src={require("../../resources/Images/home1.jpg")}
              alt="home1"
            />
            <img
              className="panel-image"
              src={require("../../resources/Images/home2.jpg")}
              alt="home2"
            />
            <img
              className="panel-image"
              src={require("../../resources/Images/home3.jpg")}
              alt="home3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
