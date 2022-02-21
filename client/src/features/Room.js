import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchCurrentRoom } from '../redux/actions';
import Canvas from './Canvas';
import RoomHeader from './RoomHeader';


export default function Room(props) {
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    // dispatch fetchRoom with params.roomId
    // action takes the roomId and the userId
    dispatch(fetchCurrentRoom(params.userId, params.roomId))
  }, [params.userId, params.roomId]);

  let image;

 
  const currentRoom = useSelector(state => state.currentRoom);

  const currentRoomSettings = useSelector(state => state.currentRoom.roomSettings);
  
  console.log('Current Room Settings: ', currentRoomSettings);
  if (currentRoomSettings !== null) {
    image = currentRoomSettings.collabCanvasImg;
  } else {
    image = null;
  }
  
  return (
    <div className="container">
      <RoomHeader name={currentRoom.name}/>
      {/* <h1>{currentRoom.name}</h1> */}
      {currentRoomSettings !== null ? <Canvas image={image}/> : <Canvas />}

    </div>

  )
}