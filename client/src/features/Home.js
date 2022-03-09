import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRooms } from '../redux/actions';
import { AuthContext } from "../App";


import styled from 'styled-components';


export default function Home(props){
  let dispatch = useDispatch();
  const navigate = useNavigate();

  // const { auth, setAuth } = useContext(AuthContext);
  // const { userInfo, setUserInfo } = useContext(AuthContext);
  // const context = useContext(AuthContext);

  // If there is state in the Redux store, pass it to me so I can give it to the Context Provider.
  // let retrievedUserInfo;
  
  let userInfo = useSelector(state => state.auth.user.userInfo);
  console.log(userInfo);

  // if (retrievedUserInfo) {
  //  setUserInfo(retrievedUserInfo);
  // } else {
  //   console.log('There is no user info in the Redux store');
  // }
  
  // console.log(context.userInfo)
 
  const displayRooms = userInfo.rooms.map((room) => {
    return (<li><Link key={userInfo._id} to={`/user/${userInfo._id}/room/${room}`}>Hey</Link></li>)
  });
  

 
  return (
    <HomeContainer>
      <h2>Welcome! {userInfo.username}</h2>
      <h2>Current rooms:</h2>
        <ul>
          {displayRooms}
        </ul>
      
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
`