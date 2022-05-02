import { normalize, schema} from 'normalizr';
import { FETCH_ROOMS, FETCH_USER_ROOMS } from "../actions/types";

const DEFAULT_STATE = {
  entries: {},
  order: []
};

const roomSchema = new schema.Entity('rooms', undefined, {
  idAttribute: (value) => value._id
});

export default function roomsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_ROOMS:
      let normalizedData = normalize(action.payload, [roomSchema]);
      
      return {
        entries: normalizedData.entities.rooms,
        order: normalizedData.result
      };
    
    case FETCH_USER_ROOMS:
      let userData = normalize(action.payload, [roomSchema]);
      return {
        entries: userData.entities.rooms,
        order: userData.result
      };

    default:
      return state;
  }
}