import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Canvas from './features/Canvas';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/nina")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Canvas/>} />
    </Routes>
  );  

}

export default App;
