import { FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "../actions/types";

const DEFAULT_STATE = [
 
];

export default function galleryReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case FETCH_GALLERY_IMAGES:
      let prevState = [...DEFAULT_STATE];
      
     for (let i = 0; i < action.payload.length; i++) {
       if (!prevState.some(e => e.id === action.payload[i].id)) {
        prevState.push({id: action.payload[i].id, image: action.payload[i].image, user: action.payload[i].user})
       }
      }
      return prevState;

    case POST_GALLERY_IMAGE:
    console.log(`This is the response when posting an image: ${action.payload}`)
    return [...state, {id: action.payload.id, image: action.payload.img, user: action.payload.user}]

      
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })