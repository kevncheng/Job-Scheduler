import React, { Component } from "react";
import { View} from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from '../components/EmployeeForm';

class AddEmployeeScreen extends Component {
  onButtonPress() {
    const {name,lastName,phone,shift} = this.props;
    
    this.props.employeeCreate({name, lastName, phone,shift: shift || 'Monday'},
    () => { this.props.navigation.goBack()}
    );
  }
  render() {

    return (
      <View style={styles.viewContainer}>
          <EmployeeForm {...this.props}/>
          <Button
            title="Create"
            onPress={this.onButtonPress.bind(this)}
          />
      </View>
    );
  }
}


const styles = {
    viewContainer: {
      justifyContent: 'center',
      flex: 1
    }
  };

const mapStateToProps = (state) => {
  const {name, lastName, phone, shift } = state.employeeForm;

  return {name, lastName, phone,shift}
};

export default connect(mapStateToProps,{employeeUpdate, employeeCreate})(AddEmployeeScreen);