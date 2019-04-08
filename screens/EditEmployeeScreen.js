import React, { Component } from 'react';
import { View, Text,Picker } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { connect } from 'react-redux';
import { employeeUpdate, employeeSave, employeeEdit, employeeDelete } from '../actions';
import _ from 'lodash';


class EditEmployeeScreen extends Component {
//   componentDidMount() {
//     _.each(this.props.navigation.getParam('employee'), (value, prop) => {
//         this.props.employeeUpdate({ prop, value });
//     });
    
//     console.log(this.props)
// }

  onButtonPress() {
    const { name, lastName, phone, shift } = this.props;
    const employeeParam = this.props.navigation.getParam('employeeInfo')
    this.props.employeeSave({ name, lastName, phone, shift, uid: employeeParam.uid },
      () => {
        this.props.navigation.goBack()
      });
    };

  onFireButtonPress(){
    const {uid} = this.props.navigation.getParam('employeeInfo');
    this.props.employeeDelete({uid},
      () => {
        this.props.navigation.goBack()
      })
  }

  render() {
    // const employeeInfo = this.props.navigation.getParam('employeeInfo')
    return (
      <View>
        <EmployeeForm 
        style={{marginBottom: 10, left: 5, right: 5}}
        {...this.props}/>
        <Button
            title='Save Changes'
            icon ={{name: 'save'}}
            onPress={this.onButtonPress.bind(this)}
            style={{margin: 10 }}
        />
        <Button
          title='Fire Employee'
          icon = {{name: 'delete-forever'}}
          onPress={this.onFireButtonPress.bind(this)}
          color= 'red'
          style={{margin: 10}}
          />
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

const mapStateToProps = (state) => {
  const {name ,lastName, phone, shift } = state.employeeForm;

  return {name,lastName,phone,shift}
};

export default connect(mapStateToProps,{ employeeUpdate, employeeSave, employeeEdit, employeeDelete })(EditEmployeeScreen);