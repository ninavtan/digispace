import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../redux/actions";
import styled from 'styled-components';
import { AuthContext } from "../../App";

export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // const currentUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault()
    const form = e.target;
    authContext.login(form[0].value, form[1].value)
    // dispatch(loginUser(form[0].value, form[1].value));
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
      <form onSubmit={event => handleLogin(event)}>
        <input required type="username"/>
        <input required type="password"/>
        <input type="submit" value="Submit"/>

      </form>
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

