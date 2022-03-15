import { normalize, schema} from 'normalizr';
import { FETCH_ROOMS } from "../actions/types";

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
      console.log(action.payload);
      const normalizedData = normalize(action.payload, [roomSchema]);
      
      return {
        entries: normalizedData.entities.rooms,
        order: normalizedData.result
      };
    
    default:
      return state;
  }
}

// map over action.payload
// action.payload.map(room => {
  /// {...state, name: room.name, user: room.user, roomSettings: room.roomSettings, authUsers: room.authUsers}
// })