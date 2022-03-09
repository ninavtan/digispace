import { FETCH_CURRENT_ROOM, FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "../actions/types";

const DEFAULT_STATE = {
  name: null,
  user: null,
  roomSettings: null,
  authUsers: null,
  gallery: new Set(),
}

export default function currentRoomReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_CURRENT_ROOM:
      console.log(action.payload);
      return {...state, name: action.payload.name, user: action.payload.user, roomSettings: action.payload.roomSettings, authUsers: action.payload.authUsers, gallery: action.payload.gallery };

    case POST_GALLERY_IMAGE:
      // return {...state, gallery: action.payload}
      console.log(`This is the response when posting an image: ${action.payload.image}`)
      const newState = { ...state };
      newState.gallery.add(action.payload.image);
      return newState;


    case FETCH_GALLERY_IMAGES:
      
      const galleryState = { ...state };
      galleryState.gallery.add(action.payload);
      console.log(galleryState);
      return galleryState;
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })