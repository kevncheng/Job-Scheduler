import firebase from 'firebase';

import {
  ANNOUNCEMENT_UPDATE,
  ANNOUNCEMENT_CREATE,
  ANNOUNCEMENT_FETCH_SUCCESS,
  ANNOUNCEMENT_SAVE_SUCCESS,
  ANNOUNCEMENT_EDIT
} from './types';


export const announcementEdit = (announcement) => {
  return  { 
    type: ANNOUNCEMENT_EDIT, 
    payload: announcement 
  };
  };



export const announcementUpdate = ({ prop, value }) => {
  return {
    type: ANNOUNCEMENT_UPDATE,
    payload: { prop, value }
  };
};

export const announcementCreate = ({ message,type },callback) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/announcements/announcement`)
      .push({ message,type })
      .then(() => {
        createUser(dispatch,callback);
      });

  };
};

const createUser = (dispatch,callback) => {
  dispatch({ type: ANNOUNCEMENT_CREATE });
  callback();
}

export const announcementFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/announcements/announcement`)
      .on('value', snapshot => {
        dispatch({ type: ANNOUNCEMENT_FETCH_SUCCESS, payload: snapshot.val() })
        console.log(snapshot.val())
      });
  };
};

export const announcementSave = ({ message,type, uid },callback) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/announcements/${uid}`)
      .set({ message,type })
      .then(() => {
        dispatch({ type: ANNOUNCEMENT_SAVE_SUCCESS });
        callback();
      });
  };
};

export const announcementDelete = ({ uid },callback) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/announcements/${uid}`)
      .remove()
      .then(callback());
  };
};
