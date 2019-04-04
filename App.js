import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'

import { createStackNavigator, createAppContainer,createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import FbAuthScreen from './screens/FacebookLoginScreen';
import EmployeeScreen from './screens/EmployeeScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';
import ScheduleScreen from './screens/ScheduleScreen';

import firebase from 'firebase';
import config from './util/keys';

const MainNavigator = createSwitchNavigator({
  welcome: {screen: WelcomeScreen},
  auth: {screen: AuthScreen},
  fbAuth: {screen: FbAuthScreen},
  main: {
    screen: createBottomTabNavigator({
      home: {screen: HomeScreen},
      schedule: {screen : ScheduleScreen},
      employees: createStackNavigator ({
        employeelist: {screen: EmployeeScreen},
        addEmployee: {screen: AddEmployeeScreen},
        editEmployee: {screen: EditEmployeeScreen }
      })
    })
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
