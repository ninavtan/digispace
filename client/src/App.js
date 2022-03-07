import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Canvas from './features/Canvas2';
// import Canvas from './features/Canvas copy';
import Home from './features/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Routes/Register';
import AuthRoutes from './features/auth/Routes/AuthRoutes';
import Room from './features/Room';
import Nav from './features/auth/Nav';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";


function App() {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  return (
    // <p>
    //   It's {response}
    // </p>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route exact path="/login" element ={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route path="user/:userId/rooms/:roomId" element={<Room/>} />
  </Routes>
    
  );  

}

export default App;
