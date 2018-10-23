import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles/';

class GestionDispositivos extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
        <View style = {styles.container}>
              <Text>Gestión de Dispositivos</Text> 
        </View>
        );
    }
      
}

export default GestionDispositivos;