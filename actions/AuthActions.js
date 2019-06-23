import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  VERIFY_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNOUT_USER,
  ERROR,
  RESET_ERROR
} from './types';

export const handleError = (error) => {
  return { 
    type: ERROR, 
    payload: error
   }
};

export const resetError = () => {
  return {
    type: REST_ERROR
  }
};

export const emailChanged = (text) => {
    return {
      type: EMAIL_CHANGED,
      payload: text
    };
  };
  
  export const passwordChanged = (text) => {
    return {
      type: PASSWORD_CHANGED,
      payload: text
    };
  };

  export const verifyPasswordChanged = (text) => {
    return {
      type: VERIFY_PASSWORD_CHANGED,
      payload: text
    };
  };
  
  export const loginUser = ({ email, password },callback) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER });
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user,callback))
        .catch(() => loginUserFail(dispatch));
    };
  };
  
  export const signupUser = ({ email, password },callback) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER });
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user,callback))
        .catch((error) => {
          handleError(error);
  
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user,callback))
            .catch(() => loginUserFail(dispatch));
        });
    };
  };


  
  const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
  };
  
  const loginUserSuccess = (dispatch, user,callback) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    })
    console.log("SUCCESS")
    callback();
  };

  const SignUpUserFail = (dispatch) => {
    dispatch({ type: SIGNUP_USER_FAIL });
  };

  

  export const signOut =(callback) =>{
    return (dispatch) => {
      dispatch({type:SIGNOUT_USER});
      firebase.auth().signOut()
            .then(callback())
            .catch(console.log('troubles signing out'));
    }
  }