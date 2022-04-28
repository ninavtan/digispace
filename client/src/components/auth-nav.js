import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../redux/actions';

import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from './authentication-button';
import { Link } from 'react-router-dom';


const AuthNav = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  (isAuthenticated) ? console.log('auth!') : console.log('not auth');

  (user) ? dispatch(fetchUserInfo(user.email)) : console.log('no user');

  let newTo;
  (user) ? newTo = {pathname: "/allrooms", 
  userEmail: user.email } : newTo = {pathname: "/allrooms"}

  return (
    <div className="auth-nav-main-div">

      <div className="auth-button-container">
        <AuthenticationButton />
      </div>

      {isAuthenticated ? 
        <div className="authed-links">
         
          <button>
            <Link to={newTo}>view digispaces</Link>
          </button>

         <Link to='/profile' className='account-link'>{user.email}</Link>
        </div>
        : null}
     
    </div>
  )
};

export default AuthNav;