import { combineReducers } from "redux";
import roomsReducer from "./room-reducer";
import usersReducer from "./user-reducer";
import currentRoomReducer from "./current-room-reducer";

const rootReducer = combineReducers({
  rooms: roomsReducer,
  user: usersReducer,
  currentRoom: currentRoomReducer,
});

export default rootReducer;