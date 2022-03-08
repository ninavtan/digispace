import React, { Component } from 'react';
import axios from "axios";
const AUTH_URL = 'http://localhost:3001/api/auth/'

  const authRegister = (username, email, password) => {
    return axios.post(AUTH_URL + "signup", {
      username,
      email,
      password,
    });
  };

  const authLogin = (username, password) => {
    return axios
      .post(AUTH_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  };
  
  const authLogout = () => {
    localStorage.removeItem("user");
  };

  export { authRegister, authLogin, authLogout };
