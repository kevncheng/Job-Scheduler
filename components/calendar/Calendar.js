import React, { Component } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { View } from 'react-native';
import { selectDate } from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment'

class Calendar extends Component {
  render() {
    return (
      <View>
        <CalendarStrip
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#0f93fe' }}
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{ color: 'white' }}
            calendarColor={'#007AFF'}
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            iconContainer={{ flex: 0.1 }}
            onDateSelected={date => this.props.selectDate(date)}
        />
      </View>
    );
  }
}

export default connect(null,{ selectDate })(Calendar);