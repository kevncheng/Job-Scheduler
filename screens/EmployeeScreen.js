import React, { Component } from "react";
import { ListView, Text, Platform,View, ScrollView, TouchableOpacity } from "react-native";
import {Icon, Button,ListItem, Divider, SearchBar,Header } from 'react-native-elements';
import EmployeeList from '../components/EmployeeList';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import _ from 'lodash';


class EmployeeScreen extends Component {
  constructor(props) {
    super(props)
    state = ({
      serach: '',
      isLoading: false
    })
  }
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


          

  renderRow(employee) {
    return (
       <EmployeeList employee={employee} />
    )
  }

  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: "Employees", style: { color: "#fff",fontSize:24 } }}
          rightComponent={<Button
            onPress = {() => this.props.navigation.navigate('addEmployee')}
            icon = {{name:'add',color:'white'}}
            type = 'clear'
          />}
          containerStyle={{
            backgroundColor:'#007AFF',
           }}
      />
        <ScrollView style={{flex:1}}>
          <SearchBar
            lightTheme
            placeholder="Search Employees"
            />
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View>
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