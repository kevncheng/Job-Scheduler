import React, { Component } from "react";
import { ListView, Text, Platform,View, ScrollView, TouchableOpacity } from "react-native";
import {Icon, Button,ListItem, Divider, SearchBar,Header } from 'react-native-elements';
import EmployeeList from '../components/EmployeeList';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import Calendar from '../components/calendar/Calendar';
import _ from 'lodash';

import moment from 'moment';
import { extendMoment } from 'moment-range';
import ScheduleList from "./ScheduleList";

class WorkingList extends Component {
    componentWillMount() {
        this.props.employeesFetch();
        this.createDataSource(this.props);
    
      }
    
      
      componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);  
      }

      createDataSource({employees}) {
        const { date } = this.props;
        
        const ds = new ListView.DataSource({
          rowHasChanged: (r1,r2) => r1 !== r2
        });
        // let newEmployeesList = _.filter(employees, function(e) {
        //     return e.name === 'Facebook account'
        // })
        let newEmployeesList = _.filter(employees, function(e) {
            if(e.shift) {
                let shiftObj = JSON.parse(e.shift)
                let selectDateObj = {day: moment(date).format('ddddD')}
                return _.find(shiftObj, selectDateObj)
            }
            
        })
        
        this.dataSource = ds.cloneWithRows(newEmployeesList)
      }
      renderRow(employee) {
        return (
           <ScheduleList employee={employee} />
        )
      }
        
  render() {
    return (
      <View>
        <ScrollView style = {{paddingBottom: 100}}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
      return {...val,uid};
    });
    const {date} = state.calendar
      return {employees, date}
  };

export default connect(mapStateToProps,{employeesFetch})(WorkingList); 