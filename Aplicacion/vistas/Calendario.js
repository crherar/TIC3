import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import PushNotification from 'react-native-push-notification';
import MySwitchButton from 'switch-button-react-native';

export default class Calendario extends Component {
 
  
  render () {


    return (
     <View>

      <MySwitchButton  
            onValueChange={(val) => this.setState({ activeSwitch: val })} 
      /> 
       <Text> Prueba </Text>
     </View>
      );
  }


}