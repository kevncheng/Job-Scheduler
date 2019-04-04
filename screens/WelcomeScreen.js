import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import _ from 'lodash'

const SLIDE_DATA = [
  { text: 'Set your job location, then swipe away', color: '#03A9F4'},
];

class WelcomeScreen extends Component {

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
        <Slides data ={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}

export default WelcomeScreen;