import React from "react";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import firebase from 'firebase'

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import AppLoadingScreen from "./screens/AppLoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import AddEmployeeScreen from "./screens/AddEmployeeScreen";
import EditEmployeeScreen from "./screens/EditEmployeeScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

import Ionicons from 'react-native-vector-icons/Ionicons';
import FacebookLoginScreen from "./screens/FacebookLoginScreen";

// const main = createBottomTabNavigator({
//   home: HomeScreen,
//   schedule: ScheduleScreen,
//   employees: Employee
// })


// const Employee = createStackNavigator({
//   employeelist: EmployeeScreen,
//   addEmployee: AddEmployeeScreen,
//   editEmployee: EditEmployeeScreen 
// })



const RootNavigator = createSwitchNavigator({
  // welcome: {screen: WelcomeScreen},
  splash: AppLoadingScreen,
  auth: AuthScreen,
  fb_auth: FacebookLoginScreen,
  register: RegisterScreen,
  main: createBottomTabNavigator({
    home: HomeScreen,
    schedule: ScheduleScreen,
    employees: createStackNavigator({
      employeelist: EmployeeScreen,
      addEmployee: AddEmployeeScreen,
      editEmployee: EditEmployeeScreen 
  },{
    headerMode:'float',
    defaultNavigationOptions: () => ({
      header:null
    })
  }
  )
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'home') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
        } else if (routeName === 'schedule') {
          iconName = `ios-calendar`;
        } else if (routeName === 'employees') {
          iconName = `ios-people`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray'
    },
    initialRouteName: "home",
    
  })
})
const AppContainer = createAppContainer(RootNavigator);


export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDrBi9lwNVUsif1BJhl-F49rXCtMD289ys",
      authDomain: "manager-468a0.firebaseapp.com",
      databaseURL: "https://manager-468a0.firebaseio.com",
      projectId: "manager-468a0",
      storageBucket: "manager-468a0.appspot.com",
      messagingSenderId: "768975716246"
    };
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