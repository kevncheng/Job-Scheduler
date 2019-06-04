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
  PREP_SHIFT_STRING
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

export const employeeCreate = ({ name,lastName, phone, shift },callback) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, lastName, phone, shift })
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

export const employeeSave = ({ name,lastName, phone, shift, uid },callback) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      // .set({ name,lastName, phone })
      .set({ name,lastName, phone, shift })
      .then(() => {
        // dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        console.log({name,lastName,phone, shift, uid})
        callback();
      });
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


export const uploadImage = async({tempURI,name,lastName}) => {
  const {currentUser} = firebase.auth();
  if(tempURI){
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', tempURI, true);
      xhr.send(null);
    });

    var ref = firebase.storage().ref().child(`avatar/${currentUser}/${name}${lastName}` );
    ref.put(blob)
      .then(()=>{
        let URL = ref.getDownloadURL()
        employeeUpdate({prop:'avatar', URL})
      })
  } 
}

export const addShift = (payload) => {
  return {
    type: ADD_SHIFT,
    payload
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

// export const confirmSaveShift = ({ name,lastName, phone, shift, uid }) => {
//   return (dispatch) => {
//     dispatch({type: PREP_SHIFT_STRING})
//       .then(() => employeeSave({ name,lastName, phone, shift, uid }))
//         .catch (err => console.log(err))
//     }
// }