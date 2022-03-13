import {normalize, schema } from 'normalizr';
import { FETCH_CURRENT_ROOM } from "../actions/types";

const DEFAULT_STATE = {
 name: null,
 user: null,
 roomSettings: null,
 authUsers: null,
 gallery: []
};


export default function currentRoomReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_CURRENT_ROOM:
      console.log(action.payload);
      return {...state, name: action.payload.name, user: action.payload.user, roomSettings: action.payload.roomSettings, authUsers: action.payload.authUsers, gallery: action.payload.gallery };

    default:
      return state;
  }
}
