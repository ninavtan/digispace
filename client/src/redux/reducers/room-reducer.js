import { FETCH_ROOMS } from "../actions/types";

const DEFAULT_STATE = {
  name: null,
  user: null,
  roomSettings: null,
  authUsers: null
}

export default function roomsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_ROOMS:
      console.log(action.payload);
      return action.payload.map(room => 
        (
      {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
        ));
    
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })