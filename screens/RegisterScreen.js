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
    return (
      <View style={styles.viewContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 60, marginBottom: 40 }}>
            "Mr.Goose"
          </Text>
        </View>
        <Input
          label="Username"
          placeholder="Enter Your Email"
          onChangeText={this.onEmailChange}
          value={this.props.email}
          style={{ marginBottom: 10 }}
        />
        <Input
          label="Enter A Password With Atleast 5 Characters"
          placeholder="Password"
          secureTextEntry
          onChangeText={this.onVerifyPasswordChange}
          value={this.props.verifyPassword}
        />
        <Input
          placeholder="Verify Your Password"
          secureTextEntry
          onChangeText={this.onPasswordChange}
          value={this.props.password}
          errorMessage={this.state.regError}
        />

        {this.renderButton()}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            type="clear"
            title="Sign In"
            style={{ color: "#007AFF", fontWeight: "bold" }}
            onPress={()=> this.props.navigation.navigate('auth')}
          />
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
  const { email, password, error, loading, verifyPassword } = auth;

  return { email, password, error, loading,verifyPassword };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
