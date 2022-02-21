import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Canvas from './features/Canvas';
import Home from './features/Home';
import Login from './features/auth/Login';
import AuthRoutes from './features/auth/Routes/AuthRoutes';
import Room from './features/Room';

function App() {
  const [data, setData] = React.useState(null);
  const [tokenStatus, setTokenStatus] = useState(false);

  let token;

  React.useEffect((token = localStorage.getItem('token')
  ) => {
    console.log(token);
  }, []);

  return (
      <Routes>

      
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route path="user/:userId/rooms/:roomId" element={<Room/>} />
  </Routes>
    
  );  

}

export default App;
