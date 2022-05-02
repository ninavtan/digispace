import {normalize, schema } from 'normalizr';
import { FETCH_CURRENT_ROOM } from "../actions/types";

const DEFAULT_STATE = {
 name: null,
 userCreated: null,
 collabCanvasFunc: false,
 chatFunc: false,
 galleryFunc: false,
 authUsers: null,
};


export default function currentRoomReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_CURRENT_ROOM:
      console.log(action.payload[0]);
     
      return {...state, name: action.payload[0].name, userCreated: action.payload[0].userCreated, collabCanvasFunc: action.payload[0].collabCanvasFunc, chatFunc: action.payload[0].chatFunc, galleryFunc: action.payload[0].galleryFunc };

    default:
      return state;
  }
}
