import { SELECTED_DATE, PARSE_SHIFT } from '../../actions/types'
import moment from 'moment'

const INITIAL_STATE = {
    date: moment(),
    parseShift: []
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
  switch (type) {
    case SELECTED_DATE:
      return {...state, date: payload}
    case PARSE_SHIFT:
      return {...state , shiftObject: JSON.parse(payload) }
    default:
      return state;
  }
};