import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Divider, ListItem, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import _ from 'lodash';

class EmployeeList extends Component {
  onRowPress = () => {
    this.props.navigation.navigate("editEmployee", {employeeInfo: this.props.employee.item});
    _.each(this.props.employee.item, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
  });
  
  }

  render() {
    const { name, lastName, shift, phone, avatar } = this.props.employee.item;
    return (
      <TouchableOpacity
        onPress={this.onRowPress}
      >
        <ListItem
        leftAvatar = {{
          source: {uri:avatar},
          icon: {name:'people'}
        }}
        title={`${name} ${lastName}`} 
        subtitle={phone} 
        chevron
          
        />

        <Divider style={{ backgroundColor: "grey" }} />
      </TouchableOpacity>
    );
  }
}


export default connect(null,{employeeUpdate})(withNavigation(EmployeeList));
