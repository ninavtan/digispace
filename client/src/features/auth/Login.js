import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault()

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    fetch("/login", {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token)
    })
  }

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate('/home') : console.log("Something went wrong when trying to login."));
  }, [])
  
  return (
    <div>
      <form onSubmit={event => handleLogin(event)}>
        <input required type="username"/>
        <input required type="password"/>
        <input type="submit" value="Submit"/>

      </form>
      </div>
  )
}