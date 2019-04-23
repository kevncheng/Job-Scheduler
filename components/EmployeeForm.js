import React, { Component } from 'react';
import { View, Text, Picker, Image,Alert } from 'react-native';
import { Button, Icon, Input, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { ImagePicker,Permissions } from 'expo'
import firebase from 'firebase';


class EmployeeForm extends Component {
  state = {
    image: null
  };

  pickImage = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)
    if (status !== 'granted') {
      alert('You need to approve permissions to upload a picture')
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled){
      this.uploadImage(result.uri)
        .then(()=>{
          this.setState({image: result.uri})
          Alert.alert("Success")
        })
        .catch(()=>{
          Alert.alert("Failed")
        })
    }
  }

  uploadImage = async (uri,imageName) =>{
    const {currentUser} = firebase.auth();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    var ref = firebase.storage().ref().child(`avatar/${currentUser}/${this.props.name}${this.props.name}${Math.floor(Math.random(1*10000))}` );
    ref.put(blob)
      
  }

  // pickImage = async () => {
  //   let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)
  //   if (status !== 'granted') {
  //     alert('You need to approve permissions to upload a picture')
  //   }
  //   let file = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4,3]
  //   })
  //   if(!file.cancelled){
  //     this.setState({image:file.uri})
  //     this.uploadImage(file.uri,'test')
  //       .then(()=>{
  //           Alert.alert('Picture Uploaded')
  //       })
  //       .catch(()=>{
  //           Alert.alert('Upload Failed')
  //       })
  //   }
  // }

  // uploadImage = async (uri,imageName) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   var ref = firebase.storage().ref().child('avatar/' + imageName)
  //   return ref.put(blob);
  // }  

  
  render() {
    let {image} = this.state
    return (
      <View>
      <View style={{justifyContent:'center', alignItems:'center', marginTop: 10}}>
        <Avatar
          rounded
          icon = {{name:'person'}}
          showEditButton
          size='xlarge'
          onPress={this.pickImage}
          source={{
            uri: image? image : '../assets/icon.png'
          }}
        />
      </View>
      <View>
          <Input
            label="First Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({prop:'name', value})}
          />
          <Input 
            label = "Last Name"
            placeholder = 'Doe'
            value = {this.props.lastName}
            onChangeText = {value => this.props.employeeUpdate({prop:'lastName', value})}
          />
      </View>
          <Input
            keyboardType = 'number-pad'
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({prop:'phone', value})}
            maxLength= {10}
          />
          {/* <Text style={styles.pickerTextStyle}>Shift</Text>
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
          </Picker> */}
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