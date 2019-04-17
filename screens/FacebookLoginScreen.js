import React, { Component } from "react";
import { View,  AsyncStorage } from "react-native";
import { Button, Input, Card, Divider } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from '../actions';
import {Facebook} from 'expo';
import firebase from 'firebase'

class FbLoginScreen extends Component {
  async onFacebookLogin() {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('1281306898660728', {
        permissions: ['public_profile']
    });
    if (type === 'success') {
                    const credential = firebase.auth.FacebookAuthProvider.credential(token)
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then(this.props.navigation.navigate('home'))
                    .catch(error =>alert(error))
    } else if(type ==='cancel'){
        alert('Facebook log in cancelled.');
        this.props.navigation.goBack()
    }
}
  componentWillMount = () => {
    this.onFacebookLogin()
  };
  

    
    render() { 
        return ( 
            <View/>
         );
    }
}
 
const mapStateToProps = ({fb_auth}) => {
    return {token: fb_auth.token }
}

export default connect(mapStateToProps,actions)(FbLoginScreen);