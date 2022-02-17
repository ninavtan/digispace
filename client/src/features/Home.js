import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchRooms } from '../redux/actions';

export default function Home(props){
  let dispatch = useDispatch();
  // fetch the user info using useSelector

  useEffect(()=> {
    dispatch(fetchRooms('620d7a6b681a861b0f6375d9'))
  }, [])
  return (
    <h2>hey everyone.</h2>
  )
}