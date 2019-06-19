import React, { Component } from 'react';
import { View, Text, Picker, Image,Alert } from 'react-native';
import { Button, Icon, Input, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { ImagePicker,Permissions } from 'expo'
import firebase from 'firebase';
import _ from 'lodash'


class EmployeeForm extends Component {
  state = ({
    avatar_uri: '',
  })

  pickImage = async () => {
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)
    if (status !== 'granted') {
      alert('You need to approve permissions to upload a picture')
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled){
      const image = result.uri
      this.setState({image})
      this.uploadImage(image)
    }
  }

  uploadImage = async (uri) =>{
    
    try {
      const {currentUser} = firebase.auth();
      const ref = firebase.storage().ref().child(`avatar/${currentUser.uid}${this.props.name}${this.props.lastName}` ); 
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
    //   await firebase.storage().ref('avatar').child(`${currentUser.uid}${this.props.name}${this.props.lastName}`)
    //   .getDownloadURL().then(function(downloadURL){
    //   // console.log('this is download url')
    //   // console.log(downloadURL)
    //   return downloadURL
    // })
    } catch(err) {
      console.log(err)
    }
}
  
  render() {
    // console.log('this.props.avatar')
    // console.log(this.props.avatar)
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
            uri: this.props.avatar? this.props.avatar : this.state.image
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
  const {name,lastName,phone,shift,avatar} = state.employeeForm;
    return {name ,lastName, phone, shift, avatar};
}

export default connect(mapStateToProps,{employeeUpdate})(EmployeeForm);