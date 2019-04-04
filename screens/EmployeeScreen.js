import React, { Component } from "react";
import { ListView, Text, Platform,View, ScrollView, TouchableOpacity } from "react-native";
import {Icon, Button,ListItem, Divider, SearchBar } from 'react-native-elements';
import EmployeeList from '../components/EmployeeList';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import _ from 'lodash';

class EmployeeScreen extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);

  }

  
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);  
  }

  createDataSource({employees}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees)
  }

 

    static navigationOptions = ({navigation}) => ({
        title:'Employees',
        headerTitle: "Employees",
        headerRight: (
          <Button
            onPress = {() => navigation.navigate('addEmployee')}
            icon = {{name:'add'}}
            type = 'clear'
          />
        ),
        style: {
            marginTop: Platform.OS === "android" ? 24 : 0
      }
    })
  
  renderRow(employee) {
    return (
       <EmployeeList employee={employee} />
    )
  }

  render() {
    return (
      <ScrollView>
      <SearchBar
          placeholder="Search Employees"
        />
      <ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
      />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return {...val,uid};
  });
    return {employees};
};

export default connect(mapStateToProps,{employeesFetch})(EmployeeScreen); 