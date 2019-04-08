import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Divider } from "react-native-elements";
import { connect } from "react-redux";
import { employeesFetch, announcementUpdate, announcementCreate, announcementDelete } from "../actions";
import Announcement from '../components/Announcement';
import _ from 'lodash';
class HomeScreen extends Component {
  // componentWillMount() {
  //   this.props.employeesFetch();
  //   this.createDataSource(this.props);
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.createDataSource(nextProps);
  // }

  // createDataSource({ employees }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //   this.dataSource = ds.cloneWithRows(employees);
  // }

  renderRow(employee) {
    return <EmployeeList employee={employee} />;
  }

  ShowCurrentDate() {
    var date = new Date().getDate();
    var day = new Date().getDay();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    return `${day}, ${month} ${date}, ${year}`;
  }

  onButtonPress(){
    <Announcement/>
  }

  renderAnnoucnements(){
    if (this.props.announcement) {
      <View>
        {this.props.announcement}
      </View>
    } else {
      <View>
        <Text>There are no announcements.</Text>
        <Button
          title = 'Announce Something!'
          icon = {{name: 'message'}}
          onPress={this.onButtonPress.bind(this)}
        />
      </View>
    }
  }

  render() {
    return (
      <View>
        <Card title="Announcements">
        {this.renderAnnoucnements}
        </Card>
        <Card title="Who's Working Today">
          <Text>{this.ShowCurrentDate()}</Text>
          <Divider style={{ backgroundColor: "grey" }}/>
          {/* <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          /> */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {announcements};
};

export default connect(
  null,
  { 
    employeesFetch,
    announcementUpdate,
    announcementDelete,
    announcementCreate
  }
)(HomeScreen);
