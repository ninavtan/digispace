import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, Outlet } from "react-router-dom";
import { fetchCurrentRoom } from '../redux/actions';
import { fetchGalleryImages } from '../redux/actions';
import Canvas from './Canvas';
import RoomHeader from './RoomHeader';
import Chat from './Chat';
import styled from 'styled-components';

/////////////////// React-Boostrap ////////////////
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Room(props) {

  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchCurrentRoom(params.id))
    dispatch(fetchGalleryImages(params.id))
  }, []);


  const room = useSelector(({ rooms }) => {
    return rooms.entries[params.id]
  });

  const gallery = useSelector(({ gallery }) => {
    return gallery;
  });

  const roomSettings = useSelector(({ currentRoomSettings }) => {
    return currentRoomSettings;
  });

  const displayImages = () => {
    if (gallery == 'null' || (gallery.length <= 0)) {
      console.log('no images');
      return (
        <h2>Images coming soon...</h2>
      )
    } else {
      return (
        gallery.map((entry) => {
          return (
            <div>
              <img id="gallery-image" src={`data:image/png;base64,${entry.image}`} alt="submitted-drawing"></img>
              <p>drawn by {entry.user}</p>
            </div>
          )
        })
      )
    }
  }

  if (!room) {
    return <div>Not found</div>;
  }

  return (
    <Container fluid className="room-container">
      <RoomHeader name={room.name}/>
      <Link to="/">Back To Index</Link>

      <Row xs="auto">
        <Col sm="7"> 
        {(roomSettings.collabCanvasFunc) ? <CanvasContainer>
            <h3>Leave a drawing for other members of this space :)</h3>
              <Canvas userId={params.userId} roomId={params.id} history={props.history} /> </CanvasContainer> : null }
          
        </Col>
       
      
        <Col id="gallery-and-chat" sm="5">
          {(roomSettings.galleryFunc) ? <GalleryContainer>
            <h3>gallery</h3>
              <Gallery>  
                {displayImages()}
              </Gallery>  
          </GalleryContainer> : null }
         

        {(roomSettings.chatFunc) ? <Chat room={params.id}/> : null }
  
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
  margin-bottom: 1em;
`