import firebase from 'firebase';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_EDIT,
  ADD_SHIFT,
  DELETE_SHIFT,
  CLEAR_FORM,
  LOAD_SHIFTS,
  PREP_SHIFT_STRING,
  SELECTED_DATE,
  PARSE_SHIFT
} from './types';

export const employeeEdit = (employee) => {
  return  { 
    type: EMPLOYEE_EDIT, 
    payload: employee 
  };
};

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name,lastName, phone, shift, avatar, uniqueKey },callback) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, lastName, phone, shift, avatar, uniqueKey })
      .then(() => {
        createUser(dispatch,callback);
      });

  };
};

const createUser = (dispatch,callback) => {
  dispatch({ type: EMPLOYEE_CREATE });
  callback();
}

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name,lastName, phone, shift, avatar, uid,uniqueKey },callback) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    let ref = firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`);
      ref.set({ name, lastName, phone, avatar,uniqueKey })
      .then(() => {
        // dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        callback();
      });
      
      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}/shift`)
      .push({shift})
      .then(() =>{
        ref.update({shift})
      })
  };
};

export const employeeDelete = ({ uid },callback) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(callback());
  };
};


export const addShift = (payload) => {
  return (dispatch) =>{ dispatch({
    type: ADD_SHIFT,
    payload
  })
  }
}
export const deleteShift = payload => {
  return {
    type: DELETE_SHIFT,
    payload
  }
}

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

export const loadShifts = () => {
  return {
    type: LOAD_SHIFTS
  }
}

export const prepShiftString = () => {
  return {
    type: PREP_SHIFT_STRING
  }
}

export const selectDate = (payload) => {
  return  {
    type: SELECTED_DATE,
    payload
  }
}

export const shiftParser = (payload) => {
  return {
    type: PARSE_SHIFT,
    payload
  }
}