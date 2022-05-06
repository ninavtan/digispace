import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRooms } from "../redux/actions";
import _ from 'lodash';
import styled from 'styled-components';

export default function MainIndex(props) {
  const rooms = useSelector(state => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRooms]);

  const renderRooms = () => {
    if (!_.isEmpty(rooms) > 0) {
      return rooms.order.map((roomID) => {
        return (
            <Link to={`/room/${roomID}`} key={roomID} className="room-link">
              {rooms.entries[roomID].name}
            </Link>
        );
      })
    } else {
      return <div>No rooms to show</div>
    }
  }

  return (
    <div>
      <br></br>
      <h3>Featured DigiSpaces</h3>
       
          <RoomList>
            {renderRooms()}
          </RoomList>
          
     
    </div>
  )
};

const RoomList = styled.ul`
  height: 100%;
  margin: 2em 4em;
  display: flex;
  justify-content: center;
  padding: 2em;
  flex-wrap: wrap;
  border: 1px solid black;
`

// const RoomsListContainer = styled.div`
//   display: flex;
//   width: 100%;
// `

