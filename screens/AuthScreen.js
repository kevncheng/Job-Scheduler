import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button, Input, Card, Divider, SocialIcon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from '../actions';

class AuthScreen extends Component {


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password },() =>{
      this.props.navigation.navigate('home')
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return <Button title='Log In' onPress={this.onButtonPress.bind(this)} style={{margin: 10}} />;
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Input
          placeholder="Username@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <Input
          placeholder="password"
          secureTextEntry
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
        
        {this.renderButton()}
        <Divider style={{ backgroundColor: 'gray' }} />
        <SocialIcon title="Log In With Facebook" type='facebook' button onPress={() => this.props.navigation.navigate('FbAuth')}/>
        <Button title="Log In With GMAIL" backgroundColor="#0288D1" />
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    justifyContent: 'center',
    flex: 1
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading};
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
