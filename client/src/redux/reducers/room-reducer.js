import { FETCH_ROOMS } from "../actions/types";

const DEFAULT_STATE = {
  rooms: []
}

export default function roomsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_ROOMS:
      console.log(action.payload);
      const newState = [...state.rooms];
      action.payload.map((room) => {
        newState.push(room);
      })

      return newState;
    
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })