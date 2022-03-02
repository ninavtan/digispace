import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchCurrentRoom } from '../redux/actions';
import { fetchGalleryImages } from '../redux/actions';
import Canvas from './Canvas2';
import RoomHeader from './RoomHeader';
import Gallery from './Gallery';
import Image from './Image';
import socketIOClient from "socket.io-client";

/////////////////// React-Boostrap ////////////////
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { current } from '@reduxjs/toolkit';

const ENDPOINT = "http://127.0.0.1:3001";


export default function Room(props) {

  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchCurrentRoom(params.userId, params.roomId))
    dispatch(fetchGalleryImages(params.roomId, params.userId));

  }, [params.userId, params.roomId, dispatch]);

  const currentRoom = useSelector(state => state.currentRoom)
  const currentRoomSettings = useSelector(state => state.currentRoom.roomSettings);

  const currentGallery = useSelector(state => state.currentRoom.gallery);

 


//////////////////////////// socket.io (in-progress) ///////////////////////
  // const [response, setResponse] = useState("");
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  return (
    <Container fluid className="room-container">
      <RoomHeader name={currentRoom.name}/>
      
     <Row xs="auto">
      <Col xs="8"
>
        <Canvas userId={params.userId} roomId={params.roomId} />
      </Col>
       
      <Col xs="4">
        <Gallery gallery={currentGallery} />      
        <img alt='current-gallery' src={currentGallery}></img>
        

      </Col>
     </Row>
      </Container>

  )
}