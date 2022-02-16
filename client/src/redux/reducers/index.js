import { combineReducers } from "redux";
import roomsReducer from "./room-reducer";

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export default rootReducer;