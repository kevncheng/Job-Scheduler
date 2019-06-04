import React, { Component } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, Card } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const ShiftModal = ({
    visible,
    onPressConfirm,
    onPressCancel,
    showPicker,
    PickerVisible,
    onPickerCancel,
    handleTimePicked,
    startTime,
    endTime
}) => {
    const { containerStyle, cardStyle } = styles;

    return (
        <Modal visible={visible} transparent animationType='slide' onRequestClose={() => {}}>
            <View style={containerStyle}>
                <Card
                    title={`START: ${moment(startTime).format('LLLL')} \n END: ${
                        moment(endTime).format('LLLL')
                    }`}
                    containerStyle={cardStyle}
                >
                    <View style={{ justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Button
                                title='Set Start Time'
                                onPress={() => {
                                    showPicker(true);
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Button
                                title='Set End Time'
                                onPress={() => {
                                    showPicker(false);
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Button
                                title='Confirm'
                                onPress={onPressConfirm}
                                buttonStyle={{ backgroundColor: 'rgb(76, 217, 100)' }}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Button
                                title='Cancel'
                                onPress={onPressCancel}
                                buttonStyle={{ backgroundColor: 'rgb(255, 69, 58)' }}
                            />
                        </View>
                    </View>
                </Card>
            </View>
            <DateTimePicker
                isVisible={PickerVisible}
                onCancel={onPickerCancel}
                onConfirm={handleTimePicked}
                mode='datetime'
                minuteInterval={5}
            />
        </Modal>
    );
};

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
    }
};

export default ShiftModal;
