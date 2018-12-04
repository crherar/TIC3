import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import PushNotification from 'react-native-push-notification';
import MySwitchButton from 'switch-button-react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

export default class Calendario extends Component {
 
  
  render () {


    return (
      <View style={{flex: 1}}>
        <KeyboardAwareView animated={true}>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>
                <TextInput style={{fontSize: 20, color: '#FFFFFF'}}>A</TextInput>

                
            </ScrollView>
          </View>
          <TouchableOpacity style={{height: 50, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
            <Text style={{fontSize: 20, color: '#FFFFFF'}}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAwareView>
      </View>
  );

  }


}