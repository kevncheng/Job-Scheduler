import React, { Component } from 'react';
import { ListView, View, ScrollView, FlatList } from 'react-native';
import { Icon, Button, ListItem, Divider, SearchBar, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';

import ScheduleList from './ScheduleList';

import _ from 'lodash';
import moment from 'moment';

class WorkingList extends Component {
    componentWillMount = () => {
      this.props.employeesFetch();
    };
    
    filterEmployees = () => {
        const { employees, date } = this.props;
        let newEmployeesList = _.filter(employees, (e) => {
                    if (e.shift) {
                        let selectDateObj = { day: date };
                        return _.find(e.shift, selectDateObj);
                    }
                });
        return newEmployeesList
    }

    render() {
        console.log(this.props.employees)
        return (
            <View>
                <ScrollView style={{ paddingBottom: 100 }}>
                    <FlatList
                        data = {this.filterEmployees()}
                        renderItem = {e => <ScheduleList employee={e}/>}
                        keyExtractor = { employee => employee.uid}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    const { date } = state.calendar;
    return { employees, date };
};

export default connect(
    mapStateToProps,
    { employeesFetch }
)(WorkingList);
