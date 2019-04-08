import firebase from 'firebase';

import {
    ANNOUCNEMENT_UPDATE,
    ANNOUCNEMENT_SAVE,
    ANNOUCNEMENT_DELETE
  } from "../actions/types";

  export const announcementUpdate = ({ prop, value }) => {
    return {
      type: ANNOUCNEMENT_UPDATE,
      payload: { prop, value }
    };
  };

  export const announcementCreate = ({announcement},callback) => {
    const { currentUser } = firebase.auth();
  
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/announcements`)
        .push({ announcement })
        .then(() => {
          createAnnouncement(dispatch,callback);
        });
  
    };
  };
  
  const createAnnouncement = (dispatch,callback) => {
    dispatch({ type: EMPLOYEE_CREATE });
    callback();
  }

  export const announcementDelete = ({ uid },callback) => {
    const { currentUser } = firebase.auth();
  
    return () => {
      firebase.database().ref(`/users/${currentUser.uid}/announcements/${uid}`)
        .remove()
        .then(callback());
    };
  };
  