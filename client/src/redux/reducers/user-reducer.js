import { LOGIN_USER } from "../actions/types";
import { REGISTER_USER } from "../actions/types";

const DEFAULT_STATE = {
  id: null,
  username: null,
  first_name: null,
  last_name: null,
  rooms: [],
  token: null
}

export default function usersReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case LOGIN_USER:
        localStorage.setItem('token', action.payload.token);
        return {...state, token: action.payload.token};
    case REGISTER_USER:
        return { state };
    default:
      return state;
  }
}