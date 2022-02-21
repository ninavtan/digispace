import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../redux/actions";

export default function Login() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault()

    const form = e.target;

    dispatch(loginUser(form[0].value, form[1].value));
  }

  useEffect(() => {
    console.log(currentUser);
    if (currentUser.username !== null) {
      navigate("/home")
    } else {
      console.log('Wrong password');
    }
  })
  
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
