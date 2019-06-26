import React, { Component } from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import { Button, Card, ButtonGroup } from 'react-native-elements';
import * as SMS from 'expo-sms';
import _ from 'lodash';
import moment from 'moment';

class TextShiftModal extends Component {
    state = {
        scheduleLength: 7,
        selectedIndex: 0,
    };
    
    filterEmployee = () => {
        let workingEmployees = {};
        _.forEach(this.props.employees, employee => {
            // workingEmployees[employee.name] = employee.name
            for (i = 1; i < this.state.scheduleLength + 2; i++) {
                let day = moment()
                    .add(i, 'day')
                    .format('LL');
                let workingShift = _.get(employee.shift, day);
                if (workingShift) {
                    let shift = {
                        ...shift,
                        [day]: workingShift
                    };
                    workingEmployees[employee.name + '' + employee.lastName] = {
                        shift,
                        ['name']: employee.name,
                        ['lastName']: employee.lastName,
                        ['phone']: employee.phone
                    };
                }
            }
        });
        return workingEmployees;
    };

    getListOfNumbers = () => {
        let phoneNumbers = [];
        _.forEach(this.filterEmployee(), employee => {
            if (employee.phone) {
                phoneNumbers = [...phoneNumbers, employee.phone];
            } 
        });
        return phoneNumbers;
    };

    prepScheduleString = () => {
        let textShiftString = '';
        let nextWeekEmployees = this.filterEmployee();
        _.forEach(nextWeekEmployees, employee => {
            textShiftString = textShiftString + `${employee.name} is working on:`;
            _.forEach(employee.shift, shift => {
                textShiftString =
                    textShiftString +
                    `\n${shift.day}: ${moment(shift.startTime).format('LT')} till ${moment(
                        shift.endTime
                    ).format('LT')}`;
            });
            textShiftString = textShiftString + '\n \n';
        });
        return textShiftString;
    };

    onTextEmployeeSchedule = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { status } = await SMS.sendSMSAsync(
                this.getListOfNumbers(),
                this.prepScheduleString()
            );
        } else {
            alert(`There's no SMS available on this device.`);
        }
        this.props.toggleModal();
    };

    updateIndex = selectedIndex => {
        this.setState({ selectedIndex });
        switch (selectedIndex) {
            case 0:
                this.setState({ scheduleLength: 7 });
                break;
            case 1:
                this.setState({ scheduleLength: 14 });
                break;
            case 2:
                this.setState({ scheduleLength: 30 });
        }
    };


    render() {
        const buttons = ['One Week', 'Two Weeks', 'One Month'];
        const { toggleModal, visible } = this.props;
        const {scheduleLength, selectedIndex} = this.state;
        const { containerStyle, cardStyle, buttonContainer } = styles;
        return (
            <Modal 
                visible = { visible } 
                animationType ='slide' 
                onRequestClose = {() => {}} 
                transparent
            >
                <View style={containerStyle}>
                    <Card
                        style={cardStyle}
                        title={`From ${moment()
                            .add(1, 'day')
                            .format('LL')} to ${moment()
                            .add(scheduleLength + 1, 'day')
                            .format('LL')}`}
                    >
                        <View>
                            <ButtonGroup
                                onPress={this.updateIndex}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                containerStyle={{ marginBottom: 15 }}
                            />
                        </View>
                        <ScrollView>
                            <Text style={{ textAlign: 'center', position: 'relative' }}>
                                {this.prepScheduleString()}
                            </Text>
                        </ScrollView>

                        <View style={buttonContainer}>
                            <Button
                                style={{ margin: 10 }}
                                title="Text Employee's Schedule"
                                onPress={this.onTextEmployeeSchedule}
                                iconRight
                                icon={{ name: 'mail-outline', color: 'white' }}
                            />
                            <Button style={{ margin: 10 }} title='Cancel' onPress={toggleModal} />
                        </View>
                    </Card>
                </View>
            </Modal>
        );
    }
}

const styles = {
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center'
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        positon: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cardStyle: {
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 10
    }
};

export default TextShiftModal;
