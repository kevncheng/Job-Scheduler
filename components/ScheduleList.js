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
        this.props.navigation.navigate('editEmployee', { employeeInfo: this.props.employee });
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    };

    renderStatus = () => {
        const { shift } = this.props.employee;
        let dateObj = { day: moment(this.props.date).format('ddddD') };
        if (!_.isUndefined(shift)) {
            try {
                let shiftString = _.find(JSON.parse(shift), dateObj);
                let range = moment.range(shiftString.startTime, shiftString.endTime);
                if (moment().within(range)) {
                    return <Badge status='success' />;
                } else {
                    return <Badge status='error' />;
                }
            } catch (e) {
                return null;
            }
        }
    };

    renderShiftTime = () => {
        const { shift } = this.props.employee;
        let dateObj = { day: moment(this.props.date).format('ddddD') };
        try {
            let shiftString = _.find(JSON.parse(shift), dateObj);
            if (!_.isUndefined(shift)) {
                return (
                    <Text>
                        {moment(shiftString.startTime).format('LT')} till{' '}
                        {moment(shiftString.endTime).format('LT')}
                    </Text>
                );
            }
            else {
                return <Text> </Text>
            }
        } catch (e) {
            return null
        } 
    };

    render() {
        const { name, lastName, shift, phone } = this.props.employee;
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
    { employeeUpdate, shiftParser }
)(withNavigation(ScheduleList));
