import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import _ from 'lodash';

class EmployeeList extends Component {
  onRowPress = () => {
    this.props.navigation.navigate("editEmployee", {employeeInfo: this.props.employee});
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
  });
  
  }

  render() {
    const { name, lastName, shift } = this.props.employee;

    return (
      <TouchableOpacity
        onPress={this.onRowPress.bind(this)}
      >
        <ListItem 
        title={`${name} ${lastName}`} 
        subtitle={shift} 
        chevron
          
        />

        <Divider style={{ backgroundColor: "grey" }} />
      </TouchableOpacity>
    );
  }
}


export default connect(null,{employeeUpdate})(withNavigation(EmployeeList));
