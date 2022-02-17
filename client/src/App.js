import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Canvas from './features/Canvas';
import Home from './features/Home';
import Login from './features/auth/Login';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/nina")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
      <Routes>
        <Route exact path="/login" element={<Login/>} />

        <Route exact path="/home" element={<Home/>} />
  </Routes>
    
  );  

}

export default App;
