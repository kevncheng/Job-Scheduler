import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Calendar from '../components/calendar/Calendar';

export default class ScheduleScreen extends Component {
  render() {
    return (
      <View>
        <Calendar/>
      </View>
    );
  }
}
