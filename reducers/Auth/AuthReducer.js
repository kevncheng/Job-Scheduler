import {
    ERROR,
    RESET_ERROR,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    VERIFY_PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUP_USER_FAIL,
    SIGNOUT_USER,
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    verifyPassword:'',
    user: null,
    error: '',
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ERROR:
        return {...state, error:action.payload}
      case RESET_ERROR:
        return {...state, error:''}
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case VERIFY_PASSWORD_CHANGED:
        return { ...state, verifyPassword: action.payload };
      
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, error: 'Authentication Failed.', password: '', verifyPassword:'', loading: false };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      
      case SIGNUP_USER:
        return { ...state, loading: true, error: '' };
      case SIGNUP_USER_FAIL:
        return { ...state, error: 'Registration Failed.', password: '',verifyPassword:'', loading: false };

      case SIGNOUT_USER:
        return INITIAL_STATE;
      
        default:
        return state;
    }
  };