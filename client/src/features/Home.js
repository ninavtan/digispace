import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRooms } from '../redux/actions';

import styled from 'styled-components';


export default function Home(props){
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);
 
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    // dispatch(fetchRooms(currentUser.id));
    const loggedInToken = localStorage.getItem("token");
    if (!loggedInToken || loggedInToken === 'undefined') {
      navigate("/home");
    }

    const user = localStorage.getItem("user");
    console.log(user);

    
  }, []);

  // const fetchUser = (user) => {
  //   fetchUser(username)
  // }

  const rooms = useSelector(state => state.rooms);

  const displayRooms = () => {
    if (rooms.length > 0) {
      rooms.forEach(function(room) {
        return (<h3><Link to={`/user/${currentUser.id}/rooms/${room.id}`}>{room.name}</Link></h3>)
      })
    } else {
      return (
        <h1>Loading rooms...</h1>
      )
    }
  }


  return (
    <HomeContainer>
      <h2>Welcome, {currentUser.username}!</h2>
      <h2>Current rooms:</h2>
      
    

      {currentUser.rooms.map(room => (
        <div><Link key={currentUser.id} to={`/user/${currentUser.id}/rooms/${room}`}>{room}</Link></div>
      ))} 

      {displayRooms()}

      <Link to='/'>Create a new room</Link>
      
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
  background-color: pink;
  height: 100vh;
  padding: 2em;
`