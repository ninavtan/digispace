import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../redux/actions";
import styled from 'styled-components';


export default function Login() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault()

    const form = e.target;

    dispatch(loginUser(form[0].value, form[1].value));
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  
  //   try {
  //     await Auth.signIn(email, password);
  //     userHasAuthenticated(true);
  //     history.push("/");
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // }

  useEffect(() => {
    console.log(currentUser);
    if (currentUser.username !== null) {
      navigate("/home")
    } else {
      console.log('Wrong password');
    }
  })
  
  return (
    <LargeSquareContainer>
    <FormDiv>
    <h2>Login</h2>

      <form onSubmit={event => handleLogin(event)}>
        <input required type="username"/>
        <input required type="password"/>
        <input type="submit" value="Submit"/>

      </form>
      <h2>Don't have an account? <a href="/register">Register here.</a></h2>
    </FormDiv>
    </LargeSquareContainer>
  )
}

const FormDiv = styled.div`
  // text-align: center;
  margin-top: 20%;
  padding: 20%;

`

const LargeSquareContainer = styled.div`
  height: 500px;
  width: 500px;
  background-color: #DAEDBD;
 margin: 2em auto;
 z-index: 3;

`

