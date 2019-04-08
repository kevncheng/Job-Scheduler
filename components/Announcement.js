import React from "react";
import { Text, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import { connect } from "react-redux";
import {
  announcementUpdate,
  announcementSave,
  announcementDelete
} from "../actions";

const Announcement = () => (
  <View>
    <Input
        placeholder= "Enter Announcement Here."
        value = {this.props.announcements}
        onChangeText = {value => announcementUpdate({prop:'announcement', value})}
    />
    <View style={styles.buttonView}>
        <Button title = 'Save' color='green' icon = {{name: 'check_circle'}}/>
        <Button title = 'Cancel' color='red' icon = {{name: 'cancel'}}/>
    </View>
  </View>
);

const styles = {
    buttonView: {
        justifyContent: 'row',
        flex: 3,
        alignContent: 'flex-end',
        margin: 10
    }
}

export default connect(
  null,
  { announcementUpdate, announcementSave, announcementDelete }
)(Announcement);
