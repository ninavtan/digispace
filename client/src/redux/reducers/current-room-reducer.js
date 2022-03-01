import { FETCH_CURRENT_ROOM, FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "../actions/types";

const DEFAULT_STATE = {
  name: null,
  user: null,
  roomSettings: null,
  authUsers: null,
  gallery: []
}

export default function currentRoomReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_CURRENT_ROOM:
      return {...state, name: action.payload.name, user: action.payload.user, roomSettings: action.payload.roomSettings, authUsers: action.payload.authUsers, gallery: action.payload.gallery };
    case POST_GALLERY_IMAGE:
      // return {...state, gallery: action.payload}
      const newState = { ...state };
      newState.gallery.push(action.payload);
      return newState;


    case FETCH_GALLERY_IMAGES:
      return {...state, gallery: action.payload }
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })