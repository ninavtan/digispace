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
      console.log(JSON.stringify(action.payload));
        return {...state};
    default:
      return state;
  }
}