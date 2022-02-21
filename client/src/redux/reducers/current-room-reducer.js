import { FETCH_CURRENT_ROOM } from "../actions/types";

const DEFAULT_STATE = {
  name: null,
  user: null,
  roomSettings: null,
  authUsers: null
}

export default function currentRoomReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_CURRENT_ROOM:
      console.log(action.payload);
      return {...state, name: action.payload.name, user: action.payload.user, roomSettings: action.payload.roomSettings, authUsers: action.payload.authUsers };
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })