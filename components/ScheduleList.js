import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider, ListItem, Badge, Icon, Avatar } from 'react-native-elements';
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
                let status = moment().within(range)? 'success' : 'error'
                return (
                    <Badge containerStyle={{ position: 'absolute', top: -4, left: 46, top: 17 }} status = {status}/>
                );
        }
    };

    renderShiftTime = () => {
        const { shift } = this.props.employee.item;            
        const { date } = this.props;
        let dateObj = { day: date };
        let foundShift = _.find(shift, dateObj);            
            if (!_.isUndefined(foundShift)) {      
                return (
                    <Text>
                        {moment(foundShift.startTime).format('LT')} till{' '}
                        {moment(foundShift.endTime).format('LT')}
                    </Text>
                );
            }

    };

    render() {
        const { name, lastName, shift, phone,avatar } = this.props.employee.item;
        // console.log(this.props.date)
        // console.log('employee')
        // console.log(this.props.employee)
        return (
            <TouchableOpacity onPress={this.onRowPress}>
            <View>
                <ListItem
                    leftAvatar = {{
                        source: {uri: avatar},
                        icon: {name:'people'}
                    }}
                    title={`${name} ${lastName}`}
                    subtitle={this.renderShiftTime()}
                    chevron
                />
                {this.renderStatus()}
            </View>
                <Divider style={{ backgroundColor: 'grey' }} />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => {
    const { date } = state.calendar;
    return { date };
};

export default connect(
    mapStateToProps,
    { employeeUpdate }
)(withNavigation(ScheduleList));
