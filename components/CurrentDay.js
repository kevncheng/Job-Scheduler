import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { Card } from 'react-native-elements';

const CurrentDay = () => (
    <View>
        <Card title={`Current Date`}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>
                {moment().format('dddd')}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>
                {moment().format('LL')}
            </Text>
        </Card>
    </View>
);

export default CurrentDay;
