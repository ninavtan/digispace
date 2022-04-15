import React from 'react';
import { Link, useHistory } from "react-router-dom";

import MainNav from './main-nav';
import AuthNav from './auth-nav';

const NavBar = () => {

  return (
    <div className="nav-container mb-3">
      {/* <nav className="navbar navbar-expand-md navbar-light bg-light"> */}
       <AuthNav />
          
       
     {/* </nav> */}
     </div>
  );
};

export default NavBar;