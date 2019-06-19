import React, { Component } from "react";
import { ListView, Text, Platform,View, ScrollView, TouchableOpacity } from "react-native";
import {Icon, Button,ListItem, Divider, SearchBar,Header } from 'react-native-elements';
import EmployeeList from '../components/EmployeeList';
import { connect } from 'react-redux';
import { employeesFetch, selectDate } from '../actions';
import Calendar from '../components/calendar/Calendar';
import _ from 'lodash';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import WorkingList from "../components/WorkingList";

const moment = extendMoment(Moment);


class ScheduleScreen extends Component {


  render() {
    return (
      <View>
        <Calendar
        />
        <WorkingList/>
        
      </View>
    );
  }
}


const mapStateToProps = state => {
  const { date } = state.calendar
  return { date }
}

export default connect(mapStateToProps, {selectDate})(ScheduleScreen); 