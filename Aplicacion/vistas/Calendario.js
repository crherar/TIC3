import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import PushNotification from 'react-native-push-notification';

export default class Calendario extends Component {
  // state = {
  //   isDateTimePickerVisible: false,
  // };

  // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // _handleDatePicked = (date) => {
  //   console.log('A date has been picked: ', date);
  //   this._hideDateTimePicker();
  // };

  render () {
    return (
      // <View style={{ flex: 1 }}>
      //   <TouchableOpacity onPress={this._showDateTimePicker}>
      //     <Text>Show DatePicker</Text>
      //   </TouchableOpacity>
      //   <DateTimePicker
      //     isVisible={this.state.isDateTimePickerVisible}
      //     onConfirm={this._handleDatePicked}
      //     onCancel={this._hideDateTimePicker}
      //   />
      // </View>
      <View>
          <CalendarList
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2018-11-24'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2018-12-05'}
            hideExtraDays = {true}
            pastScrollRange = {0}
            futureScrollRange = {1}
            scrollEnabled = {true}
            showScrollIndicator = {true}
          />

      </View>
     
      );
  }


}