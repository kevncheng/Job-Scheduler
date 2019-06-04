import React, { Component } from 'react';
import { View, Text, Picker, Alert } from 'react-native';
import { Button, Input, Icon, Header } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { connect } from 'react-redux';
import { employeeUpdate, employeeSave, employeeEdit, employeeDelete, clearForm } from '../actions';
import _ from 'lodash';

class EditEmployeeScreen extends Component {
    onBackButtonPress = () => {
        const { navigation, clearForm } = this.props;
        navigation.goBack();
        clearForm();
    };

    onAddShiftButtonPress = () => {
        const { navigation } = this.props;
        const employeeParam = navigation.getParam('employeeInfo');
        navigation.navigate('addShift', { employeeUID: employeeParam.uid });
    };

    onButtonPress = () => {
        const { name, lastName, phone, shift, employeeSave,clearForm } = this.props;
        const employeeParam = this.props.navigation.getParam('employeeInfo');

        employeeSave({ name, lastName, phone, shift, uid: employeeParam.uid }, () => {
          this.props.navigation.goBack();
          })
        clearForm()
    };

    onFireButtonPress = () => {
        const { uid } = this.props.navigation.getParam('employeeInfo');
        this.props.employeeDelete({ uid }, () => {
            this.props.navigation.goBack();
        });
    };

    render() {
        const employeeInfo = this.props.navigation.getParam('employeeInfo');
        return (
            <View>
                <Header
                    centerComponent={{
                        text: `${employeeInfo.name} ${employeeInfo.lastName}`,
                        style: { color: '#fff', fontSize: 24 }
                    }}
                    leftComponent={
                        <Button
                            onPress={() => this.onBackButtonPress()}
                            icon={{ name: 'chevron-left', color: 'white', size: 30 }}
                            type='clear'
                        />
                    }
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                />
                <EmployeeForm style={{ marginBottom: 10, left: 5, right: 5 }} {...this.props} />
                <View style={styles.buttonStyle}>
                    <Button
                        title='Save Changes'
                        icon={{ name: 'save', color: 'white' }}
                        iconRight
                        onPress={this.onButtonPress}
                        style={{ margin: 10 }}
                    />
                    <Button
                        title='Edit Shifts'
                        icon={{ name: 'edit', color: 'white' }}
                        iconRight
                        onPress={() => this.onAddShiftButtonPress()}
                        style={{ margin: 10 }}
                    />
                    <Button
                        title='Fire Employee'
                        icon={{ name: 'delete-forever', color: 'white' }}
                        iconRight
                        onPress={() => {
                            Alert.alert(
                                'Fire Employee',
                                'Are you sure you want to fire this employee?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: this.onFireButtonPress
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}
                        style={{ margin: 10, marginBottom: 10 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    },
    buttonStyle: {
        margin: 10
    }
};

const mapStateToProps = state => {
    const { name, lastName, phone, shift, avatar, tempURI } = state.employeeForm;

    return { name, lastName, phone, shift, avatar, tempURI };
};

export default connect(
    mapStateToProps,
    { employeeUpdate, employeeSave, employeeEdit, employeeDelete, clearForm }
)(EditEmployeeScreen);
