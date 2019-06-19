import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Divider, Button, Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment'
import momentDurationPlugin from 'moment-duration-format'
momentDurationPlugin(moment)

const ShiftList = ({ shiftList, onPressDelete, formatShiftDuration }) => (
    <View>
        {_.map(shiftList, (shift) => (
            <View key={shift.day}>
                <ListItem
                    title={`${moment(shift.startTime).format('LLLL')} till \n${moment(
                        shift.endTime
                    ).format('LLLL')}`}
                    subtitle={
                        `${formatShiftDuration(shift.startTime, shift.endTime)}`
                    }

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
