import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';
import _ from 'lodash';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    createDrawerNavigator
} from 'react-navigation';

import AppLoadingScreen from './screens/AppLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import EmployeeScreen from './screens/EmployeeScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import AddShiftScreen from './screens/AddShiftScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const RootNavigator = createSwitchNavigator({
    // welcome: {screen: WelcomeScreen},
    loading: AppLoadingScreen,
    auth: AuthScreen,
    register: RegisterScreen,
    main: createBottomTabNavigator(
        {
            home: HomeScreen,
            schedule: ScheduleScreen,
            employees: createStackNavigator(
                {
                    employeelist: EmployeeScreen,
                    addEmployee: AddEmployeeScreen,
                    editEmployee: EditEmployeeScreen,
                    addShift: AddShiftScreen
                },
                {
                    headerMode: 'none',
                    defaultNavigationOptions: () => ({
                        header: null
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
                    } else if (routeName === 'schedule') {
                        iconName = `ios-calendar`;
                    } else if (routeName === 'employees') {
                        iconName = `ios-people`;
                    }
                    return <IconComponent name={iconName} size={30} color={tintColor} />;
                }
            }),
            tabBarOptions: {
                activeTintColor: '#007AFF',
                inactiveTintColor: 'gray'
            },
            initialRouteName: 'home'
        }
    )
});
const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDrBi9lwNVUsif1BJhl-F49rXCtMD289ys',
            authDomain: 'manager-468a0.firebaseapp.com',
            databaseURL: 'https://manager-468a0.firebaseio.com',
            projectId: 'manager-468a0',
            storageBucket: 'manager-468a0.appspot.com',
            messagingSenderId: '768975716246'
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
