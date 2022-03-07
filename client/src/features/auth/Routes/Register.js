import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from "../../../redux/actions";

export default function Register() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleRegister(e) {
    e.preventDefault();
    const form = e.target;

    dispatch(registerUser(form[0].value, form[1].value, form[2].value));

    navigate("/login");
  }

  // useEffect(() => {
  //   console.log(currentUser);
  //   if (currentUser.username !== null) {
  //     navigate("/home")
  //   } else {
  //     console.log('Wrong password');
  //   }
  // })
  
  return (
    <LargeSquareContainer>
    <FormDiv>
    <h2>Register</h2>

      <form className="register-form" onSubmit={event => handleRegister(event)}>
        <label className="label">Email</label>
        <br />
        <input required type="email"/>
        <label className="label">Username</label>
        <br />
        <input required type="username"/>
        <label className="label">Password</label>
        <br />
        <input required type="password"/>
        <br />
        <br />

        <input className="submit-button" type="submit" value="Submit"/>

      </form>
    </FormDiv>
    </LargeSquareContainer>
  )
}

const FormDiv = styled.div`
  // text-align: center;
  margin: 20%;
  padding: 2em;

`

const LargeSquareContainer = styled.div`
  height: 500px;
  width: 500px;
  background-color: #DAEDBD;
 margin: 2em auto;
 z-index: 3;

`

