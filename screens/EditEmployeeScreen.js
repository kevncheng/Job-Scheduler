import React, { Component } from 'react';
import { View,Alert,ScrollView } from 'react-native';
import { Button, Header } from 'react-native-elements';
import EmployeeForm from '../components/EmployeeForm';
import { connect } from 'react-redux';
import { employeeUpdate, employeeSave, employeeEdit, employeeDelete, clearForm } from '../actions';
import _ from 'lodash';
import Communications from 'react-native-communications';



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
        const { name, lastName, phone, shift, avatar,employeeSave,employeeUpdate,clearForm, uniqueKey } = this.props;
        const employeeParam = this.props.navigation.getParam('employeeInfo');
        
        if(!uniqueKey){
            let key = _.uniqueId() * Math.floor(Math.random() * 100000)
            employeeUpdate({prop:'uniqueKey', value:key})
            employeeSave({ name, lastName, phone, shift, avatar: avatar || null,uid: employeeParam.uid, uniqueKey }, () => {
                this.props.navigation.goBack();
                })
              clearForm()
            
        }
        if(uniqueKey){
        employeeSave({ name, lastName, phone, shift, avatar,uid: employeeParam.uid, uniqueKey }, () => {
          this.props.navigation.goBack();
          })
        clearForm()
        }
    };

    onFireButtonPress = () => {
        const { uid } = this.props.navigation.getParam('employeeInfo');
        this.props.employeeDelete({ uid }, () => {
            this.props.navigation.goBack();
        });
    };

    onCallButtonPress = () => {
        if(this.props.phone){
        Communications.phonecall(this.props.phone, true)
        } else alert('Please Enter A Phone Number')
    }

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
                            containerStyle = {{left:-10}}
                        />
                    }
                    rightComponent = {
                        <Button 
                            onPress = {() => this.onCallButtonPress()}
                            icon = {{ name: 'phone', color: 'white', size: 30}}
                            type = 'clear'
                        />
                    }
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                />
                
                <ScrollView style = {{marginBottom: 40}}>
                <EmployeeForm style={{ marginVertical: 20 }} {...this.props} />
                
                <View style={styles.buttonStyle}>
                    <Button
                        raised
                        title='Save Changes'
                        icon={{ name: 'save', color: 'white' }}
                        iconRight
                        onPress={this.onButtonPress}
                        containerStyle={{ margin: 10 }}
                    />
                    <Button
                        raised
                        title='Edit Shifts'
                        icon={{ name: 'edit', color: 'white' }}
                        iconRight
                        onPress={() => this.onAddShiftButtonPress()}
                        containerStyle = {{margin: 10}}
                    />
                    <Button
                        raised
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
                        containerStyle={{ margin: 10}}
                    />
                </View>
                </ScrollView>
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
        margin: 15
    }
};

const mapStateToProps = state => {
    const { name, lastName, phone, shift, avatar, uniqueKey } = state.employeeForm;

    return { name, lastName, phone, shift, avatar, uniqueKey };
};

export default connect(
    mapStateToProps,
    { employeeUpdate, employeeSave, employeeEdit, employeeDelete, clearForm }
)(EditEmployeeScreen);
