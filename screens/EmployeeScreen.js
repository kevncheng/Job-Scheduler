import React, { Component } from 'react';
import {
    ListView,
    Text,
    Platform,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Icon, Button, ListItem, Divider, SearchBar, Header } from 'react-native-elements';
import EmployeeList from '../components/EmployeeList';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import _ from 'lodash';


class EmployeeScreen extends Component {
    state = {
        search: ''
    };
    componentWillMount() {
        this.props.employeesFetch();
    }

    searchFilter = () => {
        const { search } = this.state;
        if (this.state.search) {
            let result = _.filter(this.props.employees, employee => {
               if(_.includes((employee.name + employee.lastName).toLowerCase().replace(/\s/g, ''), search.toLowerCase().replace(/\s/g, ''))) {
                   return employee
               }
            });
        return result
        }
        return this.props.employees;
    };


    render() {
        
        return (
            <View>
                <Header
                    centerComponent={{ text: 'Employees', style: { color: '#fff', fontSize: 24 } }}
                    rightComponent={
                        <Button
                            onPress={() => this.props.navigation.navigate('addEmployee')}
                            icon={{ name: 'add', color: 'white' }}
                            type='clear'
                        />
                    }
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                />
                <SearchBar
                    lightTheme
                    placeholder='Search Employees'
                    color='#007AFF'
                    onChangeText={search => this.setState({ search })}
                    value={this.state.search}
                />
                <ScrollView>
                    <FlatList
                        data={this.searchFilter()}
                        renderItem={e => <EmployeeList employee={e} />}
                        keyExtractor={employee => employee.uid}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    return { employees };
};

export default connect(
    mapStateToProps,
    { employeesFetch }
)(EmployeeScreen);
