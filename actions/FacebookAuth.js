import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import key from '../util/keys';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,

} from './types';

export const facebookLogin = (callback) => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
        console.log('FB SUCCESS')
    } else {
        doFacebookLogin(dispatch)
    }
};

const doFacebookLogin = async dispatch => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync(key, {
        permissions: ['public_profile']
    });
    if(type === 'cancel'){
        return dispatch({type:FACEBOOK_LOGIN_FAIL})
    } 

    await AsyncStorage.setItem('fb_token',token);
    dispatch({type:FACEBOOK_LOGIN_SUCCESS, payload: token});
};