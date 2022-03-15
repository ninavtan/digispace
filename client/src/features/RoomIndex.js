import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRooms } from "../redux/actions";
import _ from 'lodash';

export default function RoomIndex(props) {
  const rooms = useSelector(state => state.rooms);
  console.log(rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRooms]);

  const renderRooms = () => {
    if (!_.isEmpty(rooms) > 0) {
      return rooms.order.map((roomID) => {
        return (
          <li className="list-group-item" key={roomID}>
            <Link to={`/room/${roomID}`}>
              {rooms.entries[roomID].name}
            </Link>
          </li>
        );
      })
    } else {
      return <div>No posts to show</div>
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
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
      <ul className="list-group">
        {renderRooms()}
      </ul>
    </div>
  )
};