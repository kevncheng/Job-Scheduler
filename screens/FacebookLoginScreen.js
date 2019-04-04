import React, { Component } from "react";
import { View, Text, ActivityIndicator, AsyncStorage } from "react-native";
import { Button, Input, Card, Divider } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from '../actions';

class FbLoginScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
      }
    
      componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
      }
    
      onAuthComplete(){
        if (props.token) {
          this.props.navigation.navigate('home');
        }
      }
    
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