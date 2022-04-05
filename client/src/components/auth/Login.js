import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../redux/actions";
import styled from 'styled-components';

export default function Login() {

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault()
    const form = e.target;
    
    dispatch(loginUser(form[0].value, form[1].value))
      .then((err, result) => {
        if (err) console.log(err)
     
        // navigate("/home");
      })

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
}

const FormDiv = styled.div`
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

