import React, { Component } from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';


import moment from 'moment';
console.disableYellowBox = true;


//import stylesExterno from '../styles/styles/';

//var calendario = require('./Calendario');

class AgregarIncubacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idDispositivo:'',
            nombre:'',
            cantHuevos:'',
            esVisible: false,
            fechaInicio:'',
            tipoAve:''
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
            fechaInicio: fecha //moment(fecha).format('YYYY-MM-DD HH:mm')
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

        const{idDispositivo, nombre, cantHuevos, fechaInicio, tipoAve } = this.state; // destructuracion de objetos

        var datos = {
            idDispositivo: idDispositivo, 
            nombre: nombre, 
            cantHuevos: cantHuevos, 
            tipoAve: tipoAve,
            fechaInicio: fechaInicio
        }

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

       // var data = [["Pollos", "Pavos", "Patos"]];

        let data = [{
            value: 'Pollos',
          }, {
            value: 'Pavos',
          }, {
            value: 'Patos',
          }];

        return (
            
        <View style = {styles.container}>

            <View style={{alignItems:'center'}}>
                <Text style={{ fontSize:30, color:'green', fontWeight:'bold',}}> Agregar Incubación </Text>
            </View>
                <Text style={{}}> Ingrese el ID de la incubadora </Text>
                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "black"
                onChangeText = {(texto) => this.setState({idDispositivo:texto})}
                autoCapitalize = "none"
                />
                <Text style={{}}> Nombre de la incubación </Text>
                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {(texto) => this.setState({nombre:texto})}
                //textoError = {this.state.apellidoError}
                />

                <Text style={{}}> Cantidad de huevos </Text>
                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {(texto) => this.setState({cantHuevos:texto})}
                //textoError = {this.state.apellidoError}
                />

                <Text style={{}}> Seleccione el tipo de ave a incubar </Text>

                <Dropdown 
                    baseColor = {"green"}
                    onChangeText = {(opcion) =>  this.setState({tipoAve:opcion})}
                    data={data}
                    containerStyle = {styles.inputTipoAve}
                />
                                    
                {/* {/* <Text style={{}}> Seleccione fecha inicio de la incubación </Text>                */}
                <View style={{}}>
                <TouchableOpacity style={{}} onPress={this.mostrarCalendario}>
                <Text style={{}}> Seleccione la fecha inicio de la incubación </Text>
                </TouchableOpacity>
                </View>

                <DateTimePicker
                    isVisible={this.state.esVisible}
                    onConfirm={this.setearCalendario}
                    onCancel={this.esconderCalendario}
                    mode={'datetime'}
                    is24Hour={true}
                />
                
                {/* <Text style={{}}> Fecha asignada: {this.state.fechaInicio}</Text> */}

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
        borderRadius:20,
        paddingHorizontal: 10,
        // textAlignVertical: 'top'
    },
    inputTipoAve: {
        // alignSelf:'center',
          margin:20,
         // height: 40,
         //  marginRight:30,
         //  marginLeft:30,
         borderColor: 'rgb(0, 153, 51)',
         borderWidth: 2,
         borderRadius:20,
         paddingHorizontal: 10,
         // textAlignVertical: 'top'
     },
    button: {
        alignItems:'center',
        width: 400,
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
        borderRadius:5,
    },
});

export default AgregarIncubacion;