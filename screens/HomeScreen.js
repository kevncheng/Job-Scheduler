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
        ModalVisible: false
    };
    componentWillMount = () => {
        this.props.employeesFetch();
    };

    // filter -> [day: {name:shift, name:shift}...]
    // onTextSchedulePress = () => {
    //   const { employees } = this.props;
    //   const nextWeek = moment.range(moment().add(1,'day'),moment().add(1, 'week'))
    //   _.filter(employees, employee => {
    //     if(employee.shift){
    //     let shiftObj = JSON.parse(employee.shift)
    //     _.filter(shiftObj,)
    //   }
    //   })
    // }

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

    // createNextWeekDateObj = () => {
    //   let weekObj;
    //   for( i = 1 ; i < 9 ; i++) {
    //     let day = moment().add(i,'day')
        
    //   }
    //   return weekObj
    // }

    filterEmployee = () => {
      let workingEmployees = {}
      _.forEach(this.props.employees, employee => {
        // workingEmployees[employee.name] = employee.name
        for( i = 1 ; i < 9 ; i++) {
          let day = moment().add(i,'day').format('LL')
          let workingShift = _.get(employee.shift, day)
          if(workingShift){
            let shift = {
              ...shift, [day]:workingShift, 
              
            }
            workingEmployees[employee.name + '' + employee.lastName] = {
              shift, ['name']: employee.name, ['lastName']: employee.lastName, ['phone']: employee.phone
            }
          }
        }
      })
      return workingEmployees;
    }

    getListOfNumbers = () => {
      let phoneNumbers = []
      _.forEach(this.filterEmployee(), employee => {
        if(employee.phone) {
        phoneNumbers = [...phoneNumbers, employee.phone]
        }
      })
      return phoneNumbers;
    }

    prepScheduleString = () => {
        let textShiftString = '';
        let nextWeekEmployees = this.filterEmployee()
        _.forEach(nextWeekEmployees, employee => {
            textShiftString = textShiftString + `${employee.name} is working on:`;
            _.forEach(employee.shift, shift => {
                textShiftString =
                    textShiftString + 
                    `\n${shift.day}: ${moment(shift.startTime).format('LT')} till ${moment(shift.endTime).format('LT')}`;
            });
            textShiftString = textShiftString + '\n'
        });
        return textShiftString
    };

    textEmployeeSchedule = async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
      const {status} = await SMS.sendSMSAsync(this.getListOfNumbers(),this.prepScheduleString())
      console.log(status)
      } else {
      alert(`there's no SMS available on this device`)
      }
    }

    onTextSchedulePress = () => {
        // this.setState({ModalVisible:true})
        this.textEmployeeSchedule()
        
    };

    render() {
        return (
            <View>
                <Header
                    centerComponent={{ icon: 'home', color: '#fff' }}
                    rightComponent={{ icon: 'message', color: '#fff' }}
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
                <Card>
                    <Button
                        title="Text Next Week's Schedule"
                        onPress={() => this.onTextSchedulePress()}
                    />
                    <Button 
                      title = 'test'
                      onPress = {() => this.filterEmployee()}
                    />
                </Card>
                {/* <TextShiftModal
          isVisible = {this.state.ModalVisible}
          {...this.props}
        /> */}
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
    { employeesFetch }
)(HomeScreen);
