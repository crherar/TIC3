import React, { Component } from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { 
    FormLabel, 
    FormInput, 
    FormValidationMessage 
} from 'react-native-elements'

import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

//import stylesExterno from '../styles/styles/';

//var calendario = require('./Calendario');

class AgregarIncubacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            cantHuevos:'',
            esVisible: false,
            fechaElegida:'',
        };
    }

    obtenerNombre = (inputNombre) => {
        this.setState({nombre:inputNombre
        });
    }

    obtenerCantHuevos = (inputCantHuevos) => {
        this.setState({
            cantHuevos:inputCantHuevos
        });
    }

    setearCalendario = (fecha) => {
        this.setState({
            esVisible: false,
            fechaElegida: moment(fecha).format('MMMM, Do YYYY HH:mm')
        });
    } 

    mostrarCalendario = () => {
        this.setState({
            esVisible: true
        });
    }

    esconderCalendario = () => {
        this.setState({
            esVisible: false
        })
    }


    onPressAgregarIncubacion() {

        const{nombre, cantHuevos} = this.state; // destructuracion de objetos

        var datos = {'nombre': nombre, 'cantHuevos': cantHuevos}

        console.log(datos);
        
        fetch('http://192.168.100.5:3000/agregarIncubacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        }
        ).then(res => res.json())
        .catch(error => console.error('Se produjo un error:', error))
        .then(response => {
            console.log('Respuesta del servidor:', response);
            // if (response.mensaje == 'ER_DUP_ENTRY') {
            //     alert("Este email ya se encuentra en uso.");
            // }        
            // else {
            //    alert('Usuario registrado existosamente.');
            // }
        });
    }

    render() {
        return (

        <View style = {styles.container}>

                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Nombre"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                />

                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Cantidad de huevos"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.cantHuevos}
                //textoError = {this.state.apellidoError}
                />

                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Cantidad de huevos"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.cantHuevos}
                //textoError = {this.state.apellidoError}
                />

                <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.button} onPress={this.mostrarCalendario}>
                    <Text style={styles.text}> Seleccionar fecha inicio </Text>
                </TouchableOpacity>
                </View>

                <DateTimePicker
                    isVisible={this.state.esVisible}
                    onConfirm={this.setearCalendario}
                    onCancel={this.esconderCalendario}
                    mode={'datetime'}
                    is24Hour={true}
                />

                <View style={{alignItems:'center'}}>
                <Text style={{color:'green', fontSize:20}}> {this.state.fechaElegida}</Text>
                </View>

                <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.botonOk} onPress={this.onPressAgregarIncubacion.bind(this)}>
                    <Text style={styles.textoBotonOk}> OK </Text>
                </TouchableOpacity>
                </View>
                
        </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        flexDirection:'column',
        //alignItems:'center',
        backgroundColor:'white'
    },
    input: {
       // alignSelf:'center',
         margin:20,
        // height: 40,
        //  marginRight:30,
        //  marginLeft:30,
        borderColor: 'rgb(0, 153, 51)',
        borderWidth: 2,
        borderRadius:0,
        paddingHorizontal: 10,
        // textAlignVertical: 'top'
    },
    button: {
        alignItems:'center',
        width: 250,
        //height: 50,
        backgroundColor: 'green',
        borderRadius: 30,
        //justifyContent:'center',
        marginTop:15
    },
    text: {
        fontSize:18,
        color:'white',
        textAlign:'center',
        alignItems:'center',
    },
    textoBotonOk: {
        color:'white',
        fontWeight:'bold'
    },
    botonOk: {
        alignItems:'center',
        // marginTop:30,
        marginRight:120,
        marginLeft:120,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        backgroundColor: 'green',
        borderRadius:0,
    },
});

export default AgregarIncubacion;