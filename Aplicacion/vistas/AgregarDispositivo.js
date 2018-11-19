import React, { Component } from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

console.disableYellowBox = true;


//import stylesExterno from '../styles/styles/';

class AgregarDispositivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idDispositivo:'',
            nombre:'',
            email:'',
        };
    }


    onPressAgregarDispositivo() {

        const{ idDispositivo, nombre, email} = this.state; // destructuracion de objetos

        var datos = {
            idDispositivo: idDispositivo,
            nombre: nombre,
            email: 'crherar@gmail.com'
        }

        console.log("Datos enviados (Agregar Dispositivo):", datos);
        
        fetch('http://192.168.100.5:3000/agregarDispositivo', {
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
        });
    }

    render() {


        return (
            
        <View style = {styles.container}>
     
            <View style={{alignItems:'center'}}>
                <Text style={{ fontSize:30, color:'green', fontWeight:'bold',}}> Agregar Dispositivo </Text>
            </View>

            <Text style={{}}> Ingrese ID del dispositivo </Text>
            <TextInput 
            style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = ""
            placeholderTextColor = "black"
            autoCapitalize = "none"
            onChangeText = {(id) => this.setState({idDispositivo:id})}
            />

            <Text style={{}}> Ingrese nombre del dispositivo </Text>
                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {(texto) => this.setState({nombre:texto})}
            />

            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.botonOk} onPress={this.onPressAgregarDispositivo.bind(this)}>
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

export default AgregarDispositivo;