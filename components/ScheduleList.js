import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider, ListItem, Badge, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { employeeUpdate, shiftParser } from '../actions';
import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class ScheduleList extends Component {
    onRowPress = () => {
        this.props.navigation.navigate('editEmployee', { employeeInfo: this.props.employee.item });
        _.each(this.props.employee.item, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    };

    renderStatus = () => {
        const { shift } = this.props.employee.item;
        const { date } = this.props;
        let dateObj = { day: date };
        let foundShift = _.find(shift, dateObj);
        if (!!(foundShift)) {
                
                let range = moment.range(foundShift.startTime, foundShift.endTime);
                if (moment().within(range)) {
                    return <Badge status='success' />;
                } 
            else {
                return <Badge status = 'error'/>;
            }
        }
    };

    renderShiftTime = () => {
        const { shift } = this.props.employee.item;            
        const { date } = this.props;
        let dateObj = { day: date };
        let foundShift = _.find(shift, dateObj);            
            if (!_.isUndefined(foundShift)) {      
                // console.log('foundShift')
                // console.log(foundShift)
                // console.log(`shift: ${shift}`)
                // console.log(`date: ${date}`)
                return (
                    <Text>
                        {moment(foundShift.startTime).format('LT')} till{' '}
                        {moment(foundShift.endTime).format('LT')}
                    </Text>
                );
            }

    };

    render() {
        const { name, lastName, shift, phone } = this.props.employee.item;
        // console.log(this.props.date)
        // console.log('employee')
        // console.log(this.props.employee)
        return (
            <TouchableOpacity onPress={this.onRowPress}>
                <ListItem
                    avatar={<Icon name='people' />}
                    title={`${name} ${lastName}`}
                    subtitle={this.renderShiftTime()}
                    leftIcon={this.renderStatus}
                    chevron
                />

                <Divider style={{ backgroundColor: 'grey' }} />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => {
    const { date, parseShift } = state.calendar;
    return { date, parseShift };
};

export default connect(
    mapStateToProps,
    { employeeUpdate }
)(withNavigation(ScheduleList));
