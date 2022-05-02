import { combineReducers } from "redux";
import roomsReducer from "./room-reducer";
import userReducer from "./user-reducer";
import currentRoomReducer from "./current-room-reducer";
// import authReducer from "./auth";
import galleryReducer from "./gallery-reducer";

const rootReducer = combineReducers({
  rooms: roomsReducer,
  user: userReducer,
  currentRoomSettings: currentRoomReducer,
  // auth: authReducer,
  gallery: galleryReducer,
});

export default rootReducer;