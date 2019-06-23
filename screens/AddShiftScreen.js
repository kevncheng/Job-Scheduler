import React, { Component } from 'react';
import { View, Text, Modal, Alert, ScrollView } from 'react-native';
import { Button, Input, Header, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    addShift,
    loadShifts,
    prepShiftString,
    employeeSave,
    deleteShift
} from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ShiftModal from '../components/ShiftModal';
import moment from 'moment';
import _ from 'lodash';
import ShiftList from '../components/ShiftList';

class AddShiftScreen extends Component {
    state = {
        showModal: false,
        PickerVisible: false,
        pickStart: true,
        startTime: '',
        endTime: ''
    };


    onPressBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    saveShift = () => {
        const { employeeSave, name, lastName, phone, shift, navigation, } = this.props;
        const uid = navigation.getParam('employeeUID');
        employeeSave({ name, lastName, phone, shift, uid }, () => navigation.goBack());
    };

    onPressConfirm = async () => {
        const { startTime, endTime } = this.state;
        const { addShift, shift } = this.props;
        let day = moment(startTime).format('LL');
        let shiftAssigned = { day };
        if (moment(startTime).isAfter(endTime)) {
            return alert('Please Enter A Valid Time Range.');
        }
        if (!startTime || !endTime) {
            return alert('Please Enter A Valid Time.');
        } else if (_.find(shift, shiftAssigned)) {
            return alert('There Is Already A Shift Assigned For This Date.');
        } else {
            addShift({ day, startTime, endTime });
            this.toggleModal();
        }
    };

    onPickerCancel = () => {
        this.setState({ showPicker: !this.state.PickerVisible });
    };
    showPicker = start => {
        let pickStart = start ? true : false;
        this.setState({ PickerVisible: true, pickStart });
    };

    handleTimePicked = time => {
        const { pickStart, PickerVisible } = this.state;
        pickStart
            ? this.setState({ PickerVisible: !PickerVisible, startTime: time })
            : this.setState({ PickerVisible: !PickerVisible, endTime: time });
    };

    onPressDelete = (start, end) => {
        const { deleteShift } = this.props;
        let day = moment(start).format('LL');
        const obj = { startTime: start, endTime: end, day };
        Alert.alert(
            'Are You Sure You Want To Delete?',
            `${moment(start).format('LLLL')} till ${moment(end).format('LLLL')}`,
            [
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteShift(obj);
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );
    };

    formatShiftDuration = (startTime, endTime) => {
        let h = moment(endTime).diff(moment(startTime), 'hours');
        let m = Math.ceil(moment(endTime).diff(moment(startTime), 'minutes') % 60);
        let durationText = h === 0 ? m + ' Minutes' : h + ' Hours ' + m + ' Minutes';
        return durationText;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={{ text: 'Shifts', style: { color: '#ffff', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                    rightComponent={
                        <Button
                            onPress={() => this.toggleModal()}
                            icon={{ name: 'add', color: 'white' }}
                            type='clear'
                        />
                    }
                    leftComponent={
                        <Button
                            onPress={() => this.onPressBack()}
                            icon={{ name: 'chevron-left', color: 'white', size: 30 }}
                            type='clear'
                        />
                    }
                />

                <ShiftModal
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    visible={this.state.showModal}
                    PickerVisible={this.state.PickerVisible}
                    onPressConfirm={this.onPressConfirm}
                    onPressCancel={this.toggleModal}
                    showPicker={this.showPicker}
                    onPickerCancel={this.toggleModal}
                    handleTimePicked={this.handleTimePicked}
                />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, marginBottom: 60 }}>
                        <ShiftList
                            shiftList={this.props.shift}
                            onPressDelete={this.onPressDelete}
                            formatShiftDuration={this.formatShiftDuration}
                        />
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 10, right: 0, left: 0 }}>
                    <Button
                        title='Create Employee'
                        onPress={() => this.saveShift()}
                        icon={{ name: 'save', color: 'white' }}
                        buttonStyle={{ margin: 10 }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { name, lastName, phone, shift} = state.employeeForm;
    return { shift, name, lastName, phone };
};

export default connect(
    mapStateToProps,
    { addShift, loadShifts, prepShiftString, employeeSave, deleteShift }
)(AddShiftScreen);
