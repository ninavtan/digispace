import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRooms } from '../redux/actions';

import styled from 'styled-components';


export default function Home(props){
  let dispatch = useDispatch();
  const navigate = useNavigate();
  // fetch the user info using useSelector
 
  return (
    <HomeContainer>
      <h2>Welcome, {props.currentUser}!</h2>
      <h2>Current rooms:</h2>
      {/* <h2>{currentUser.rooms}</h2>

      {currentUser.rooms.map(room => (
        <div><Link key={currentUser.id} to={`/user/${currentUser.id}/rooms/${room}`}>AYY!</Link></div> */}
      {/* ))} */}
      
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
`