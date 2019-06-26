import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, AsyncStorage, Alert } from 'react-native';
import { Button, Input, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Facebook } from 'expo';
import firebase from 'firebase';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class AuthScreen extends Component {
    onFacebookLogin = async () => {
        let { type, token } = await Facebook.logInWithReadPermissionsAsync('1281306898660728', {
            permissions: ['public_profile']
        });
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(this.props.navigation.navigate('home'))
                .catch(error => alert(error));
        } else if (type === 'cancel') {
            alert('Facebook Log In Cancelled');
        }
    };

    onEmailChange = text => {
        this.props.emailChanged(text);
    };

    onPasswordChange = text => {
        this.props.passwordChanged(text);
    };

    onButtonPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password }, () => {
            this.props.navigation.navigate('home');
        });
    };

    renderButton = () => {
        if (this.props.loading) {
            return <ActivityIndicator size='large' />;
        }

        return (
            <Button
                style={{ fontWeight: 'bold' }}
                title='Sign In'
                onPress={this.onButtonPress}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
            />
        );
    };

    render() {
        const {
            errorStyle,
            labelStyle,
            viewContainer,
            titleContainer,
            titleStyle,
            subtitlePositon
        } = styles;
        return (
            <View style={viewContainer}>
                <View style={titleContainer}>
                    <Text style={titleStyle}>"Mr.Goose"</Text>
                    <Text style={subtitlePositon}>"A Shift Managing App"</Text>
                </View>
                <View style={{ position: 'relative' }}>
                    <Input
                        label='Username'
                        labelStyle={labelStyle}
                        placeholder='Enter Your Email'
                        onChangeText={this.onEmailChange}
                        value={this.props.email}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <Input
                        label='Password'
                        labelStyle={labelStyle}
                        placeholder='Enter Password'
                        secureTextEntry
                        onChangeText={this.onPasswordChange}
                        value={this.props.password}
                        errorMessage={this.props.error}
                        errorStyle={errorStyle}
                    />
                </View>
                <View style={{ position: 'relative' }}>
                    {this.renderButton()}

                    <Text style={{ margin: 6, color: 'grey', textAlign: 'center' }}>
                        or continue with
                    </Text>

                    <SocialIcon
                        title='Connect With Facebook'
                        type='facebook'
                        button
                        onPress={() => this.onFacebookLogin()}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            type='clear'
                            title='Sign Up'
                            style={{ color: '#007AFF', fontWeight: 'bold' }}
                            onPress={() => this.props.navigation.navigate('register')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    viewContainer: {
        justifyContent: 'center',
        flex: 1
    },
    buttonStyle: {
        borderColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center',
        width: (width * 13) / 25,
        height: height / 12
    },
    buttonContainerStyle: {
        marginTop: 30
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginLeft: 20,
        marginRight: 20
    },
    errorStyle: {
        position: 'absolute',
        bottom: -20,
        left: 5
    },
    labelStyle: {
        color: '#007AFF'
    },
    titleContainer: {
        left: 0,
        right: 0,
        marginVertical: 50
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 60,
        textAlign: 'center'
    },
    subtitlePositon: {
        position: 'absolute',
        bottom: -20,
        right: 20,
        fontSize: 14
    },
    continueText: {}
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

export default connect(
    mapStateToProps,
    actions
)(AuthScreen);
