import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, Outlet } from "react-router-dom";
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


const ENDPOINT = "http://127.0.0.1:3001";


export default function Room(props) {

  const dispatch = useDispatch();
  let params = useParams();

  // get local storage 'bearer'
  let token = localStorage.getItem('Bearer');
  
  useEffect(() => {
    dispatch(fetchGalleryImages(params.roomId));
  });

  const currentGallery = useSelector(state => state.currentRoom.gallery);
  console.log(currentGallery);

  let galleryArray = [];
  for (let [key, value] of currentGallery.entries()) galleryArray.push(value);
  console.log(galleryArray);
  

  const displayImages = () => {
    if (galleryArray == 'undefined' || galleryArray.length == 0) {
      return (
        <h2>Images coming soon...</h2>
      )
    } else {
      return (
        galleryArray[0].map((image) => {
          return (
            <img id="gallery-image" src={`data:image/png;base64,${image}`} alt="submitted-drawing"></img>
          )
        }))
    }
  }
  
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
      <RoomHeader name="nina's room"/>
        <Row xs="auto">
          <Col xs="7"> 
            <CanvasContainer>
              <h3>Leave a cool drawing for other members of this room :)</h3>
              <Canvas userId={params.userId} roomId={params.roomId} token={token} />
            </CanvasContainer>
          </Col>
       
      
      <Col xs="5">
      <GalleryContainer>
        <h3>gallery</h3>
        <Gallery>  
          {(currentGallery ? displayImages() : null)}
        {/* {displayImages()} */}
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
  margin: 0 auto;
  text-align: center;
  border: solid black 1px;
  overflow-x:hidden;
  overflow-y:auto;
  
  .placeholder{
    margin: 2em;
  }

`

const CanvasContainer = styled.div`
  border: 1px solid black;
  // background-color: #DAEDBD;
  text-align: center;
  margin: 0.5em auto;
  padding: 2em;

`

const GalleryContainer = styled.div`
  text-align: center;
`