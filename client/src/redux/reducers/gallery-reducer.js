import { FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "../actions/types";

const DEFAULT_STATE = {
  images: [
  {
    id: null,
    image: null,
    user: null,
  }
]
}


export default function galleryReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_GALLERY_IMAGES:
      console.log(action.payload)
      return {...state, images: [action.payload]};

    case POST_GALLERY_IMAGE:
    console.log(`This is the response when posting an image: ${action.payload.image}`)
    return [...state.images, action.payload]

      
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })