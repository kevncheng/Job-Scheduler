import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { Card } from 'react-native-elements';

const CurrentDay = () => (
    <View>
        <Card
        title = {`Current Date`}
        >
            <Text style = {{fontWeight:'bold', fontSize: 60, textAlign:'center'}}>{moment().format('dddd')}</Text>
            <Text style = {{fontWeight:'bold', fontSize: 30, textAlign:'center'}}>{moment().format('LL')}</Text>
        </Card>
    </View>
);

const styles = {
    dateStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        flex: 1
    }
}

export default CurrentDay;
