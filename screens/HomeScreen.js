import React, { Component } from 'react';
import { View, AsyncStorage, Alert, ListView } from 'react-native';
import { Button, Header, Avatar, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { announcementFetch, signOut } from '../actions';
import _ from 'lodash';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import * as SMS from 'expo-sms';
import CurrentDay from '../components/CurrentDay';
import { employeesFetch } from '../actions';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import TextShiftModal from '../components/TextShiftModal';

const moment = extendMoment(Moment);

class HomeScreen extends Component {
    state = {
        showModal: false
    };
    componentWillMount = () => {
        this.props.employeesFetch();
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    onSignOut = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to Log Out?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.signOut(() => {
                            this.props.navigation.navigate('auth');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );
    };

 
    

    onTextSchedulePress = () => {
        // this.setState({ModalVisible:true})
        this.textEmployeeSchedule()
        
    };

    render() {
        return (
            <View>
                <Header
                    centerComponent={{ icon: 'home', color: '#fff' }}
                    leftComponent={
                        <Button
                            type='clear'
                            icon={{ name: 'exit-to-app', color: 'white' }}
                            onPress={this.onSignOut}
                        />
                    }
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                />
                <CurrentDay />
              
                    <Button
                        title="Text Employee's Schedule"
                        onPress={() => this.toggleModal()}
                        containerStyle = {{margin: 30}}
                    />
               
                <TextShiftModal
                    visible = {this.state.showModal}
                    toggleModal = {this.toggleModal}
                    employees = {this.props.employees}
        />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    const { date } = state.calendar;
    return { employees, date };
};

export default connect(
    mapStateToProps,
    { employeesFetch,signOut }
)(HomeScreen);
