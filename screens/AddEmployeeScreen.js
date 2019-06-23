import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate, uploadImage } from '../actions';
import EmployeeForm from '../components/EmployeeForm';
import _ from 'lodash';


class AddEmployeeScreen extends Component {
    componentWillMount = () => {
        let uniqueKey = _.uniqueId() * Math.floor(Math.random() * 100000);
        this.props.employeeUpdate({ prop: 'uniqueKey', value: uniqueKey });
    };

    onButtonPress = () => {
        const { name, lastName, phone, shift, avatar, uniqueKey } = this.props;
        if (name < 1) {
            alert('Please Enter A Name');
        } else {
            this.props.employeeCreate(
                { name, lastName, phone, shift: shift || '', avatar: avatar || null, uniqueKey },
                () => {
                    this.props.navigation.goBack();
                }
            );
        }
    };
    render() {
        return (
            <View>
                <Header
                    centerComponent={{
                        text: 'Profile',
                        style: { color: '#fff', fontSize: 24 }
                    }}
                    leftComponent={
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            icon={{ name: 'chevron-left', color: 'white', size: 30 }}
                            type='clear'
                            containerStyle={{ left: -10 }}
                        />
                    }
                    containerStyle={{
                        backgroundColor: '#007AFF'
                    }}
                />
                <EmployeeForm {...this.props} />
                <Button
                    title='Save Changes'
                    icon={{ name: 'save', color: 'white' }}
                    iconRight
                    onPress={this.onButtonPress}
                    containerStyle={{ margin: 20 }}
                    raised
                />
            </View>
        );
    }
}


const mapStateToProps = state => {
    const { name, lastName, phone, shift, avatar, uniqueKey } = state.employeeForm;

    return { name, lastName, phone, shift, avatar, uniqueKey };
};

export default connect(
    mapStateToProps,
    { employeeUpdate, employeeCreate, uploadImage }
)(AddEmployeeScreen);
