import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route, useNavigate
} from "react-router-dom";
import Canvas from './features/Canvas2';
// import Canvas from './features/Canvas copy';
import Home from './features/Home';
import Login from './features/auth/Login';
import AuthRoutes from './features/auth/Routes/AuthRoutes';
import Room from './features/Room';
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../src/redux/actions";
import ProtectedRoute from './features/ProtectedRoute';


// Where do I set AuthContext?
export const AuthContext = React.createContext({
  auth: false,
  setAuth: () => {},
  userInfo: {},
  setUserInfo: () => {}
});

const ENDPOINT = "http://127.0.0.1:3001";

// The App component is a container with React Router. It gets app state from Redux Store.

function App() {

  const dispatch = useDispatch();

  const [auth, setAuth] = useState('false');
  const [userInfo, setUserInfo] = useState(null);
  const value = { auth, setAuth, userInfo, setUserInfo }

  // This is working!
  const login = (username, password) => { 
    return dispatch(loginUser(username, password)) 
    .then((user) => {
      console.log('HEY!!');
      // setIsAuth(true);
    })
  };

  // Now need to figure out how to render routes based on isAuth state.
  

  const navigate = useNavigate();

  // const [isAuth, setIsAuth] = useState(false);

  const [response, setResponse] = useState("");

  useEffect(() => {

  });
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  // should App have the Login?
  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        
        <Route exact path="/home" element={<ProtectedRoute/>}>
          <Route exact path="/home" element={<Home/>} />
        </Route>

        {/* <Route exact path="user/:userId/room/:roomId" element={<ProtectedRoute/>}> */}
          <Route path="user/:userId/room/:roomId" element={<Room/>} />
        {/* </Route> */}
      </Routes>
    </AuthContext.Provider>
    
  );  

}

export default App;
