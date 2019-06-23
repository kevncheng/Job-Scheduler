import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS,
    ADD_SHIFT,
    DELETE_SHIFT,
    CLEAR_FORM,
  } from '../../actions/types';
  
import _ from 'lodash';


  const INITIAL_STATE = {
    name: '',
    lastName: '',
    phone: '',
    shift: {},
    shiftObj: [],
    uniqueKey: 0
  };
  
  export default (state = INITIAL_STATE, action) => {
    const {payload, type } = action;
    switch (type) {
      case EMPLOYEE_UPDATE:
        return { ...state, [payload.prop]: payload.value };
      case EMPLOYEE_CREATE:
        return INITIAL_STATE;
      case EMPLOYEE_SAVE_SUCCESS:
        return INITIAL_STATE;
      case CLEAR_FORM:
        return INITIAL_STATE
      case ADD_SHIFT:
        return { ...state, shift: {...state.shift, [payload.day]:payload}}
      case DELETE_SHIFT:
        const {[payload.day]: omitted, ...shift} = state.shift;
        return { ...state, shift }
      default:
        return state;
    }
  };
  