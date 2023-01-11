import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import NavBar from '../../components/navBar/navBar'
import apiEndpoint from '../../utils/api';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const validate = async (accessToken) => {
    await axios({
      method: "POST",
      url: `${apiEndpoint}auth/validateToken`,
      data: {
        accessToken: accessToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "not authenticated") {
          navigate(`/login`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
  });
  return (
    <><NavBar /></>
  )
}
