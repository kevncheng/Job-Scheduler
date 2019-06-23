import React, { Component } from "react";
import { View, Text, ActivityIndicator, Dimensions , Alert} from "react-native";
import {
  Button,
  Input
} from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";


const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

class AuthScreen extends Component {
  state=({regError: ''})

  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onVerifyPasswordChange = text => {
    this.props.verifyPasswordChanged(text);
  };

  onButtonPress = () => {
    const { email, password, verifyPassword } = this.props;
     if(password === verifyPassword && password.length>4 ) {
    this.props.signupUser({ email, password }, () => {
      this.props.navigation.navigate("home");
      AsyncStorage.setItem('@LogInCredentials', {email,password});
    });
  } else if (password !== verifyPassword){
    this.setState({regError:'Passwords Do Not Match'})
  } else if (password.length < 5) {
    this.setState({regError:'Password Must Be Atleast Five Characters'})
  } else {
    this.setState({regError: 'Something Went Wrong'})
  }
  
};

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button
        style={{ fontWeight: "bold" }}
        title="Sign Up"
        onPress={this.onButtonPress}
        buttonStyle={styles.buttonStyle}
      />
    );
  };

  render() {
    const { viewContainer, labelStyle, titleContainer, subtitlePositon, titlePositon } = styles;
    return (
      <View style={viewContainer}>
        <View style={titleContainer}>
          <Text style={titlePositon}>
            "Mr.Goose"
          </Text>
          <Text style = {subtitlePositon}>"A Shift Managing App"</Text>
        </View>
        <View style = {{position: 'relative',}}>
        <Input
          label="Username"
          labelStyle = {labelStyle}
          placeholder="Enter Your Email"
          onChangeText={this.onEmailChange}
          value={this.props.email}
          containerStyle = {{ marginBottom: 10}}
        />
        <Input
          label="Enter A Password With Atleast 5 Characters"
          labelStyle = {labelStyle}
          placeholder="Password"
          secureTextEntry
          onChangeText={this.onVerifyPasswordChange}
          value={this.props.verifyPassword}
          containerStyle = {{ marginBottom: 10}}
          
        />
        <Input
          placeholder="Verify Your Password"
          secureTextEntry
          onChangeText={this.onPasswordChange}
          value={this.props.password}
          errorMessage={this.state.regError}
          containerStyle = {{ marginBottom: 10}}
          errorStyle = {{position: 'absolute', bottom: -20, left: 5}}
        />
        </View>
        <View style = {{position: 'relative', }}>
        {this.renderButton()}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            type="clear"
            title="Sign In"
            style={{ color: "#007AFF", fontWeight: "bold" }}
            onPress={()=> this.props.navigation.navigate('auth')}
            containerStyle = {{marginTop: 10}}
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
  },
  buttonStyle: {
    borderColor: "blue",
    alignSelf: "center",
    justifyContent: "center",
    width: (width * 13) / 25,
    height: height / 12,
    marginVertical: 10
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginVertical: 10,
  },
  labelStyle: {
    color:'#007AFF'
  },
  titleContainer: {
    left: 0, right: 0, marginBottom: 50
  },
  subtitlePositon: {
    position: 'absolute', bottom: -20, right: 20, fontSize: 14
  },
  titlePositon: {
    fontWeight: "bold", fontSize: 60, textAlign:'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, verifyPassword } = auth;

  return { email, password, error, loading,verifyPassword };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
