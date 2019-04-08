import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Button, Icon, Input, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
      <View>
        <Avatar
          rounded
          icon = {{name:'person'}}
          showEditButton
        />
      </View>
      <View>
          <Input
            label="First Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({prop:'name', value})}
            leftIcon={
              <Icon
                name='people'
                size={24}
                color='black'
              />
            }
          />
          <Input 
            label = "Last Name"
            placeholder = 'Doe'
            value = {this.props.lastName}
            onChangeText = {value => this.props.employeeUpdate({prop:'lastName', value})}
          />
      </View>
          <Input
            keyboardType = 'numeric'
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({prop:'phone', value})}
            leftIcon={
              <Icon
                name='phone'
                size={24}
                color='black'
              />
              }
          />
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
}

// const mapStateToProps = (state) => {
//   const {name,phone,shift} = state.employeeForm;
//     return {name , phone, shift};
// }

export default connect(null,{employeeUpdate})(EmployeeForm);