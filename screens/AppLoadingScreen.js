import React, { Component } from 'react';
import { View, Text,AsyncStorage, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';

class AppLoadingScreen extends Component {
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user? 'main' : 'auth')
      })
    };
    

  render() {
    return (
     <View style = {styles.container}>
     <ActivityIndicator size = 'large'/>
      </View>
    );
  }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}


export default AppLoadingScreen;