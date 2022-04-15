import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRooms } from '../redux/actions';

const DigiSpaceIndex = (props) => {

  console.log(props.location.userEmail);

  const dispatch = useDispatch();

  // Meant to be a protected route: https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#1-protecting-a-route-in-a-react-router-dom-app

  // Grab user email from Redux store
  // Dispatch action to grab all rooms with user email
  useEffect(() => {
   dispatch(fetchUserRooms(props.location.userEmail));
  }, []);
  // Display clickable links here

  return (
    <div>
      <h1>DigiSpace Index</h1>
    </div>
  )
};

export default DigiSpaceIndex;