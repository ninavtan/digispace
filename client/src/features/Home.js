import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRooms } from '../redux/actions';
import { fetchCurrentRoom } from '../redux/actions';
import { AuthContext } from "../App";


import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const ROOT_URL = 'http://localhost:3001';


export default function Home(){

  let navigate = useNavigate();

  let dispatch = useDispatch();
  
  const handleSearchInput = (e) => {
    e.preventDefault();
    const form = e.target;
    // dispatch
   console.log(form[0].value)
   axios.get(`${ROOT_URL}/room/${form[0].value}`)
    .then(res => {
      console.log(res);
      navigate(`/room/${form[0].value}`)
    })
    .catch(err => {
      console.log(err)
    })
  //  dispatch(fetchCurrentRoom(form[0].value));
   // If the room exists...
   // Navigate the user to it. If not, send a message saying that we don't got it.
   navigate(``)
   
  }
  

  // sample room id: 621dba7a7720e737b91e7513
  return (
    <HomeContainer>
      <h1>Welcome!</h1>
      <div>
        <h2>If you know the room id, type it in below.</h2>
        <form onSubmit={handleSearchInput}>
          <input name="room-id"></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
  
`