import React, { Component } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import {
  Button,
  Input,
  SocialIcon
} from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

class AuthScreen extends Component {
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onButtonPress = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password }, () => {
      this.props.navigation.navigate("home");
    });
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
          label="Password"
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={this.onPasswordChange}
          value={this.props.password}
          errorMessage={this.props.error}
        />
        <Input
          label="Verify Your Password"
          secureTextEntry
          onChangeText={this.onPasswordChange}
          value={this.props.password}
          errorMessage={this.props.error}
        />

        {this.renderButton()}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text color="rgba(52, 52, 52, 0.4)">or connect with</Text>
        </View>
        <SocialIcon
          title="Sign Up With Facebook"
          type="facebook"
          button
          onPress={() => this.props.navigation.navigate("FbAuth")}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            type="clear"
            title="Log In"
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
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
