import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Home from '../../Home';

const PublicRoute = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
    </Routes>
  )
}

export default PublicRoute;