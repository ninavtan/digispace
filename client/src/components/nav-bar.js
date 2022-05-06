import React from 'react';
import { Link, useHistory } from "react-router-dom";

import MainNav from './main-nav';
import AuthNav from './auth-nav';

const NavBar = () => {

  return (
    <div className="nav-container">
       <AuthNav />
    </div>
  );
};

export default NavBar;