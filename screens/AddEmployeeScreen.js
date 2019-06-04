import React, { Component } from "react";
import { View} from "react-native";
import { Button, Icon, Header } from "react-native-elements";
import { connect } from "react-redux";
import { employeeUpdate, employeeCreate, uploadImage } from '../actions';
import EmployeeForm from '../components/EmployeeForm';
import firebase from 'firebase'

class AddEmployeeScreen extends Component {

  onButtonPress = () => {
    const {name,lastName,phone,shift} = this.props;
    
    this.props.employeeCreate({name, lastName, phone,shift: shift || ''},
    () => { this.props.navigation.goBack()}
    );
  }
  render() {
    return (
      
      <View>
          <Header
            centerComponent={{ text: "Create An Employee", style: { color: "#fff",fontSize:24 } }}
            leftComponent={<Button
            onPress = {() => this.props.navigation.goBack()}
            icon = {{name:'chevron-left',color:'white',size:30}}
            type = 'clear'
          />}
          />
          <EmployeeForm {...this.props}/>
          <Button
          title="Save Changes"
          icon={{ name: "save",color:'white' }}
          iconRight
          onPress={this.onButtonPress}
          style={{ margin: 10 }}
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
  const {name, lastName, phone, shift, tempURI } = state.employeeForm;

  return {name, lastName, phone,shift,tempURI}
};

export default connect(mapStateToProps,{employeeUpdate, employeeCreate, uploadImage})(AddEmployeeScreen);