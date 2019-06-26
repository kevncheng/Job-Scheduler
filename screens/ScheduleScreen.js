import React, { Component } from 'react';
import { View } from 'react-native';
import Calendar from '../components/calendar/Calendar';
import WorkingList from '../components/WorkingList';
import _ from 'lodash';

class ScheduleScreen extends Component {
    render() {
        return (
            <View>
                <Calendar />
                <WorkingList />
            </View>
        );
    }
}

export default ScheduleScreen;
