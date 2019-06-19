import { SELECTED_DATE, PARSE_SHIFT } from '../../actions/types'
import moment from 'moment'

const INITIAL_STATE = {
    date: moment().format('LL'),

};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
  switch (type) {
    case SELECTED_DATE:
      return {...state, date: moment(payload).format('LL')}
    default:
      return state;
  }
};