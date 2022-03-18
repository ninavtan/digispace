import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRooms } from "../redux/actions";
import _ from 'lodash';
import styled from 'styled-components';


export default function RoomIndex(props) {
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
          <RoomList className="list-group-item" key={roomID}>
            <Link to={`/room/${roomID}`}>
              {rooms.entries[roomID].name}
            </Link>
          </RoomList>
        );
      })
    } else {
      return <div>No rooms to show</div>
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/room/${e.target[0].value}`);
  }

  return (
    <div>
      <div className="text-xs-right">
        <label>type in a room id</label>
        <form onSubmit={handleSearchSubmit}>
          <input
            name="room-id"
            placeholder="room id"
          ></input>
          <button type="submit">go!</button>
          </form>
      </div>
      <br></br>
      <h3>Featured Rooms</h3>
      <RoomList className="list-group">
        {renderRooms()}
      </RoomList>
    </div>
  )
};

const RoomList = styled.ul`
  display: flex;  
  border-radius: 4em;
  height: 40%;
  width: 50%;
  margin: 0 auto;
`