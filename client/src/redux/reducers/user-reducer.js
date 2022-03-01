import { LOGIN_USER } from "../actions/types";

const DEFAULT_STATE = {
  id: null,
  username: null,
  first_name: null,
  last_name: null,
  rooms: [],
}

export default function usersReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case LOGIN_USER:
        return {...state, id: action.payload.data.id, username: action.payload.data.username, rooms: action.payload.data.rooms, token: action.payload.token};

    default:
      return state;
  }
}