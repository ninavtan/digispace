import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchCurrentRoom } from '../redux/actions';
import { fetchGalleryImages } from '../redux/actions';
import Canvas from './Canvas2';
import RoomHeader from './RoomHeader';
import styled from 'styled-components';

// import Gallery from './Gallery';
import Image from './Image';
import socketIOClient from "socket.io-client";

/////////////////// React-Boostrap ////////////////
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { AuthContext } from "../App";


const ENDPOINT = "http://127.0.0.1:3001";


export default function Room(props) {

  const dispatch = useDispatch();
  let params = useParams();

  // get local storage 'bearer'
  let token = localStorage.getItem('Bearer');
  console.log(token);
  
  useEffect(() => {
    
    dispatch(fetchCurrentRoom(params.userId, params.roomId, token))
    dispatch(fetchGalleryImages(params.roomId, params.userId, token));

  }, []);

  const currentRoom = useSelector(state => state.currentRoom)
  // const currentRoomSettings = useSelector(state => state.currentRoom.roomSettings);

  const currentGallery = useSelector(state => state.currentRoom.gallery);
  console.log(currentGallery);


//////////////////////////// socket.io (in-progress) ///////////////////////
  // const [response, setResponse] = useState("");
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  const displayImages = () => {
    if (currentGallery.length > 0) {
    return (
    //   <img src={`data:image/png;base64,${currentGallery['0']['0']}`} alt="submitted-drawing"></img>
    // )
      // <Image src={`data:image/png;base64,${currentGallery}`} alt="submitted-drawing"></Image>
      currentGallery['0'].map((image) => {
        return (
          <img src={`data:image/png;base64,${image}`} alt="submitted-drawing"></img>
        )
        }))
      // }))
    } else {
      return (
        <h2>Images coming soon!</h2>
      )
    }
  }

  return (
    <Container fluid className="room-container">
      <RoomHeader name={currentRoom.name}/>
        <Row xs="auto">
          <Col xs="7"> 
            <CanvasContainer>
              <h3>Leave a cool drawing for other members of this room :)</h3>
              <Canvas userId={params.userId} roomId={params.roomId} token={token} />
            </CanvasContainer>
          </Col>
       
      
      <Col xs="5">
      <GalleryContainer>
        <Gallery>  
          <h3>gallery</h3>
        {displayImages()}
        </Gallery>  
      </GalleryContainer>  
      </Col>
       
    </Row>
      </Container>

  )
}
const Gallery = styled.div`
  height: 500px;
  width: 500px;
  background-color: #DAEDBD;
  margin: 0.5em auto;
  text-align: center;

`

const CanvasContainer = styled.div`
  border: 1px solid black;
  // background-color: #DAEDBD;
  text-align: center;
  margin: 0.5em auto;

`

const GalleryContainer = styled.div`
  background-color: #DAEDBD;

`