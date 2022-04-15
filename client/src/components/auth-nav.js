import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../redux/actions';

import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from './authentication-button';
import { Link } from 'react-router-dom';


const AuthNav = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  (isAuthenticated) ? console.log('auth!') : console.log('not auth');

  // TODO
  // dispatch Redux action that will send user info to backend
  (user) ? dispatch(fetchUserInfo(user.email)) : console.log('no user');

  // Backend will find user with same user (email) ? and populate navbar I guess
  
  // Create Rooms component that will show the DigiSpaces that user has
  let newTo;
  (user) ? newTo = {pathname: "/allrooms", 
  userEmail: user.email } : newTo = {pathname: "/allrooms"}

  return (
    <div className="auth-nav-main-div">
      <AuthenticationButton />
      {isAuthenticated ? 
        <div className="authed-links">
          <button>
            <Link to={newTo}>view digispaces</Link>
          </button>

         <Link to='/profile' className='account-link'>Account</Link>
        </div>
        : null}
     
    </div>
  )
};

export default AuthNav;