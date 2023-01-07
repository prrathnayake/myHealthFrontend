import React, { useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import "./home_screen.css";

export default function HomeScreen() {
  let slideIndex = 0;

  useEffect(() => {
    showSlides();
  });

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
    setTimeout(showSlides, 2000);
  }

  return (
    <>
      <NavBar />
      <div className="home-screen">
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
