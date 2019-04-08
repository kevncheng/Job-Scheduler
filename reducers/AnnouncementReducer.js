import {
  ANNOUCNEMENT_UPDATE,
  ANNOUCNEMENT_SAVE,
  ANNOUCNEMENT_DELETE
} from "../actions/types";

const INITIAL_STATE = {
  announcement: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ANNOUCNEMENT_UPDATE:
      return { ...state, announcement: action.payload.value };
    case ANNOUCNEMENT_SAVE:
        return INITIAL_STATE;
    case ANNOUCNEMENT_DELETE:
        return INITIAL_STATE;
    default:
      return state;
  }
};
