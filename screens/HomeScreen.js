import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  ListView,
  ScrollView,
  FlatList
} from "react-native";
import { Card, Divider, Button, Header } from "react-native-elements";
import { connect } from "react-redux";
import AnnouncementList from "../components/AnnouncementList";
import { announcementFetch } from "../actions";
import _ from "lodash";
import { withNavigation } from "react-navigation";

class HomeScreen extends Component {
  componentWillMount() {
    this.props.announcementFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ announcements }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(announcements);
  }

  renderRow(announcement) {
    return <View />;
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Header
          centerComponent={{ icon:'home',  color: "#fff" }}
          rightComponent={{ icon: "message", color: "#fff" }}
          containerStyle={{
            backgroundColor:'#007AFF',
          }}
        />
        <ScrollView>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const announcements = _.map(state.announcements, (val, uid) => {
    return { ...val, uid };
  });
  return { announcements };
};

export default connect(
  mapStateToProps,
  {
    announcementFetch
  }
)(withNavigation(HomeScreen));
