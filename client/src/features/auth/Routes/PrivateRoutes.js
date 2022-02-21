import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Login';
import Home from '../../Home';

const PrivateRoutes = ({token}) => {
  if (token) {
    console.log('token!')
  } else {
    console.log('no token');
  }
  return (
    <Routes>
       <Route path="/home" element={<Home/>} />
    </Routes>
  )
};

export default PrivateRoutes;