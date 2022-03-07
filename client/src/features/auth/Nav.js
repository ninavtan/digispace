import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function Nav() {
  let navigate = useNavigate();

  function handleBackClick() {
    navigate(-1);
  }

  function handleForwardClick() {
    navigate(1);
  }
return (
  <NavigationContainer>
    <Button onClick={handleBackClick} variant="success" size="sm">Back</Button>
    <a href="/home">Home</a>
    <Button onClick={handleForwardClick} variant="success" size="sm" >Forward</Button> 
  </NavigationContainer>
  
)
}

const NavigationContainer = styled.div`
text-align: center;
margin: 0 auto;
  padding: 2px;
  display: flex;
  justify-content: center;
  gap: 10px;
`