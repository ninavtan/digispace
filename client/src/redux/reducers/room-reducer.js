import { FETCH_ROOMS } from "../actions/types";

const DEFAULT_STATE = {
  name: 'Woo-Hoo!',
  user: 'me'
}

export default function roomsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_ROOMS:
        return ('fetched the rooms, babe')
    default:
      return state;
  }
}