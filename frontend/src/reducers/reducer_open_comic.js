import { OPEN_COVER } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case OPEN_COVER:
      if (action.payload && action.payload.data) {
        return action.payload.data;
      } else {
        return null
      }
    default: return state;
  }
}
