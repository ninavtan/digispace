import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRooms } from '../redux/actions';

export default function Home(props){
  let dispatch = useDispatch();
  const navigate = useNavigate();
  // fetch the user info using useSelector
  const currentUser = useSelector(state => state.user);
  const rooms = useSelector(state => state.rooms);
  
  const token = useSelector(state => state.user.token);
  console.log(token)

  useEffect(()=> {
    
    // dispatch(fetchRooms('620d7a6b681a861b0f6375d9'))
    // console.log(rooms);
    // console.log(currentUser);
  }, []);

  return (
    <div className="container">
      <h2>{currentUser.username}</h2>
      <h2>{currentUser.rooms}</h2>

      {currentUser.rooms.map(room => (
        <div><Link key={currentUser.id} to={`/user/${currentUser.id}/rooms/${room}`}>AYY!</Link></div>
      ))}
      
    

    </div>
  )
}