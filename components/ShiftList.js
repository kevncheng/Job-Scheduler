import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Divider, Button, Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';

const ShiftList = ({ shiftList, onPressDelete }) => (
    <View>
        {shiftList.map((shift, i) => (
            <View key={i}>
                <ListItem
                    title={`${moment(shift.startTime).format('LLLL')} till \n${moment(
                        shift.endTime
                    ).format('LLLL')}`}
                    subtitle={`${moment(shift.endTime).diff(
                        moment(shift.startTime),
                        'minutes'
                    )} minutes`}
                    onPress = {() => console.log(i)}
                    rightIcon = {
                        <Button
                            type = 'clear'
                            onPress = {() =>onPressDelete(shift.startTime,shift.endTime)}
                            icon = {<Icon
                                name = 'clear'
                                color = 'red'
                            />}            
                        />
                    }
                />
                <Divider />
            </View>
        ))}
    </View>
);

export default ShiftList;
