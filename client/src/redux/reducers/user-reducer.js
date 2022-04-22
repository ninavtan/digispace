import { FETCH_USER_INFO, FETCH_USER_ROOMS } from "../actions/types";

const DEFAULT_STATE = {
  email: null,
  rooms: [],
}
export default function userReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_USER_INFO:
      return {...state, email: action.payload}
    case FETCH_USER_ROOMS:
      return {...state, rooms: action.payload}
        // rooms: action.payload
      
  default:
    return state;
  }
}
