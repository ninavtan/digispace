import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { fetchUserRooms } from '../redux/actions';

const DigiSpaceIndex = (props) => {

  console.log(props.location.userEmail);

  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
   dispatch(fetchUserRooms(props.location.userEmail));
  }, []);

  const userRooms = useSelector((state) => state.user.rooms)

  const displayUserRooms = () => userRooms.map((room) => {
    return (
      <DigiSpaceDiv>
        <DigiSpaceName>
          <Link style={{ textDecoration: 'none', color: 'black' }} to={`/room/${room._id}`}>{room.name}</Link>
          </DigiSpaceName>
      </DigiSpaceDiv>
    )
  })

  let createPage;
  (user) ? createPage = {pathname: "/create", 
  userEmail: user.email } : createPage = {pathname: "/create"}

  return (
    <IndexDiv>
      <h1>DigiSpace Index</h1>
      {(!userRooms ||userRooms.length == 0) ? <h2>no rooms to show</h2> : displayUserRooms()}

      <h5><Link to={createPage}>Create new DigiSpace</Link></h5>
    </IndexDiv>
  )
};

export default DigiSpaceIndex;

const DigiSpaceDiv = styled.div`
background-color: purple;
border-radius: 2em;
color: black;
`
const DigiSpaceName = styled.h2`

`
const IndexDiv = styled.div`
padding: 1em;
`