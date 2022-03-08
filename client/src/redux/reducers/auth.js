import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      }
      default: {
        return state;
      }
    }
  }

