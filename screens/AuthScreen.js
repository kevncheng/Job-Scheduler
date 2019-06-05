import React, { Component } from "react";
import { View, Text, ActivityIndicator, Dimensions,AsyncStorage, Alert } from "react-native";
import {
  Button,
  Input,
  SocialIcon
} from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import {Facebook} from 'expo';
import firebase from 'firebase'

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

class AuthScreen extends Component {
   onFacebookLogin = async () => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('1281306898660728', {
        permissions: ['public_profile']
    });
    if (type === 'success') {
                    const credential = firebase.auth.FacebookAuthProvider.credential(token)
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then(this.props.navigation.navigate('home'))
                    .catch(error =>alert(error))
    } else if(type ==='cancel'){
      alert('Facebook Log In Cancelled')
    }
}
  
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onButtonPress = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password }, () => {
      // this.saveCredentials();
      this.props.navigation.navigate("home");
      
    });
  };

  // saveCredentials() {
  //   const { email, password} = this.props;
  //   let obj = {
  //     login: email,
  //     password: password
  //   }
  //   AsyncStorage.setItem('@LoginCredentials',JSON.stringify(obj))
  // }

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button
        style={{ fontWeight: "bold" }}
        title="Sign In"
        onPress={this.onButtonPress}
        buttonStyle={styles.buttonStyle}
      />
    );
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={{ position: 'absolute', top: 100, left: 0, right: 0, }}>
          <Text style={{ fontWeight: "bold", fontSize: 60, textAlign:'center', }}>
            "Mr.Goose"
          </Text>
        </View>
        <View style = {{position: 'absolute', top: 220,  left: 0 , right: 0}}>
        <Input
          label="Username"
          placeholder="Enter Your Email"
          onChangeText={this.onEmailChange}
          value={this.props.email}
          containerStyle = {{marginBottom: 10}}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={this.onPasswordChange}
          value={this.props.password}
          errorMessage={this.props.error}
          errorStyle = {{position: 'absolute', bottom: -20, left: 5}}
        />
        </View>
        <View style = {{position: 'absolute', top: 420, left: 0, right: 0}}>
        {this.renderButton()}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style = {{margin: 4}}>or continue with</Text>
        </View>
        <SocialIcon
          title="Sign In With Facebook"
          type="facebook"
          button
          onPress={() => this.onFacebookLogin()}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            type="clear"
            title="Sign Up"
            style={{ color: "#007AFF", fontWeight: "bold" }}
            onPress={()=>this.props.navigation.navigate('register')}
          />
        </View>
        </View>
        
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(251,247,245,.2)"
  },
  buttonStyle: {
    borderColor: "blue",
    alignSelf: "center",
    justifyContent: "center",
    width: (width * 13) / 25,
    height: height / 12,
    marginTop: 30
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginLeft: 20,
    marginRight: 20
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
