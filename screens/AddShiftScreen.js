import React, { Component } from 'react';
import { View, Text, Modal, Alert, ScrollView } from 'react-native';
import ShiftPicker from '../components/ShiftPicker';
import { Button, Input, Header, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    addShift,
    loadShifts,
    prepShiftString,
    employeeSave,
    confirmSaveShift,
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

    componentDidMount = () => {
        const { navigation } = this.props;

        if (this.props.shift) {
            this.props.loadShifts();
        }
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    onPressBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    saveShift = () => {
        const { employeeSave, name, lastName, phone, shift, navigation } = this.props;
        const uid = navigation.getParam('employeeUID');
        employeeSave({ name, lastName, phone, shift, uid }, () => navigation.goBack());
    };

    onPressConfirm = async () => {
        const { startTime, endTime } = this.state;
        const {
            addShift,
            prepShiftString,
            shift,
            navigation,
            name,
            phone,
            lastName,
            employeeSave,
            shiftObj,
            confirmSaveShift
        } = this.props;
        const uid = navigation.getParam('employeeUID');
        let day = moment(startTime).format('ddddD');
        if (moment(startTime).isAfter(endTime)) {
            return alert('Please Enter A Valid Time Range.');
        }
        if (!startTime || !endTime) {
            return alert('Please Enter A Valid Time.');
        } else {
            addShift({ day, startTime, endTime });
            prepShiftString();
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

    onPressDelete = (start,end) => {
        const { deleteShift, prepShiftString } = this.props;
        let day = moment(start).format('ddddD');
        const obj = [{ startTime: start, endTime: end, day }];
        Alert.alert(
            'Are You Sure You Want To Delete?',
            `${moment(start).format('LLLL')} till ${moment(end).format('LLLL')}`,
            [
              {text: 'Delete', onPress: () => {
                  deleteShift(obj);
                    prepShiftString();
                }},
              {
                text: 'Cancel',
                onPress: () =>{},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        
    };

    render() {
        // console.log('SHIFTS');
        // console.log(this.props.shift);
        console.log('SHIFT OBJ');
        console.log(this.props.shiftObj);
        // const {name,lastName,phone} = this.props;
        // console.log(`${name}${lastName}${phone}${this.props.navigation.getParam()}`)
        //console.log(JSON.parse(this.props.shift))
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
                            shiftList={this.props.shiftObj}
                            onPressDelete={this.onPressDelete}
                        />
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 10, right: 0, left: 0 }}>
                    <Button
                        title='Save Changes'
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
    const { name, lastName, phone, shift, shiftObj } = state.employeeForm;
    return { shift, shiftObj, name, lastName, phone };
};

export default connect(
    mapStateToProps,
    { addShift, loadShifts, prepShiftString, employeeSave, deleteShift }
)(AddShiftScreen);
