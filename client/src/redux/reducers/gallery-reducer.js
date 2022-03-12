import { FETCH_GALLERY_IMAGES } from "../actions/types";

const DEFAULT_STATE = {
  images: [
  {
    id: null,
    image: null,
  }
]
}


export default function galleryReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_GALLERY_IMAGES:
   return {...state, images: [action.payload]};

    
      
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })