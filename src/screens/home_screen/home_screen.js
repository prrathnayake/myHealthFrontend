import React, { useEffect, useState } from "react";
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
    // showSlides();
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides] = useState([
    {
        id: 1,
        src: require("../../resources/Images/home1.jpg"),
        caption: 'Image 1'
    },
    {
        id: 2,
        src: require("../../resources/Images/home2.jpg"),
        caption: 'Image 2'
    },
    {
        id: 3,
        src: require("../../resources/Images/home3.jpg"),
        caption: 'Image 3'
    }
]);

  // function showSlides() {
  //   let i;
  //   let slides = document.getElementsByClassName("panel-image");
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   slideIndex++;
  //   if (slideIndex > slides.length) {
  //     slideIndex = 1;
  //   }
  //   slides[slideIndex - 1].style.display = "block";
  //   setTimeout(showSlides, 5000);
  // }

  useEffect(() => {
    let slideInterval = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
}, [currentSlide, slides]);

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
          {slides.map((slide, index) => (
            <div
                key={slide.id}
                 style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
                <img className="panel-image" src={slide.src} alt={slide.caption} />
            </div>
        ))}
          </div>
        </div>
      </div>
    </>
  );
}
