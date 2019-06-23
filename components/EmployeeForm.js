import React, { Component } from 'react';
import { View, Text, Picker, Image,Alert } from 'react-native';
import { Button, Icon, Input, Avatar, Divider, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { ImagePicker,Permissions } from 'expo'
import firebase from 'firebase';
import _ from 'lodash'


class EmployeeForm extends Component {
 componentDidMount = async () => {
  await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)
};

  

  pickImage = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)
    console.log(status)
    if (status !== 'granted') {
      alert('You need to approve permissions to upload a picture')
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if(!result.cancelled){
      const image = result.uri
      this.setState({image})
      this.uploadImage(image)
    }
  }

  uploadImage = async (uri) =>{
    try {
      const {currentUser} = firebase.auth();
      const ref = firebase.storage().ref().child(`avatar/${currentUser.uid}${this.props.uniqueKey}` ); 
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
      await ref.put(blob)
      const url = await ref.getDownloadURL()
      this.props.employeeUpdate({prop:'avatar', value: url})
    } catch(err) {
      console.log(err)
    }
}
  
  render() {
    const { labelStyle } = styles;
    const { name, lastName, avatar, phone, employeeUpdate } = this.props;
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
            uri: avatar
          }}
        />
      </View>
      
      <View>
          <Input
            label="First Name"
            labelStyle = {labelStyle}
            placeholder="Jane"
            value={name}
            onChangeText={value => employeeUpdate({prop:'name', value})}
          />
          <Input 
            label = "Last Name"
            labelStyle = {labelStyle}
            placeholder = 'Doe'
            value = {lastName}
            onChangeText = {value => employeeUpdate({prop:'lastName', value})}
          />
      </View>
          <Input
            keyboardType = 'number-pad'
            labelStyle = {labelStyle}
            label="Phone"
            placeholder="555-555-5555"
            value={phone}
            onChangeText={value => employeeUpdate({prop:'phone', value})}
            maxLength= {10}
          />

      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  labelStyle : {
    color:'#007AFF'
  }
}

const mapStateToProps = (state) => {
  const {name,lastName,phone,shift,avatar, uniqueKey} = state.employeeForm;
    return {name ,lastName, phone, shift, avatar, uniqueKey};
}

export default connect(mapStateToProps,{employeeUpdate})(EmployeeForm);