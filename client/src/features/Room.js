import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchCurrentRoom } from '../redux/actions';
import Canvas from './Canvas';


export default function Room(props) {
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    // dispatch fetchRoom with params.roomId
    // action takes the roomId and the userId
    dispatch(fetchCurrentRoom(params.userId, params.roomId))
  }, [params.userId, params.roomId]);

  let image;

  const currentRoomSettings = useSelector(state => state.currentRoom.roomSettings);
  console.log('Current Room Settings: ', currentRoomSettings);
  // let image = (currentRoomSettings.collabCanvasImg);
  if (currentRoomSettings !== null) {
    image = currentRoomSettings.collabCanvasImg;
  } else {
    image = null;
  }
  // const imageLink = currentRoomSettings.collabCanvasImg;
  // console.log(currentRoomSettings.collabCanvasImg);
 // import Canvas element
 // pass stuff to Canvas (image link, collab canvas, etc)

  return (
    <div className="container">
      {currentRoomSettings !== null ? <Canvas image={image}/> : <Canvas />}

      <h1>HI!</h1>

      {/* <img className="img" src={currentRoomSettings.collabCanvasImg} alt="user-uploaded"></img> */}

    </div>

  )
}