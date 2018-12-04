import React, { Component } from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

console.disableYellowBox = true;


class AgregarDispositivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idDispositivo:'',
            nombre:'',
            email:'',
            validacionID:true,
            validacionNombre:true,
        };
    }

    onPressAgregarDispositivo() {

        if(this.state.idDispositivo == ''){
            this.setState({validacionID:false});
            alert("El campo de ID no puede estar vacío.");
            return;
        } 
        if (this.state.nombre == '') {
            this.setState({validacionNombre:false});
            alert("El campo de nombre no puede estar vacío.");
            return;
        } if (this.state.validacionID == false) {
            this.setState({validacionID:false});
            alert("El ID solo puede contener números.");
            return;
        } if(this.state.validacionNombre == false) {
            this.setState({validacionNombre:false});
            alert("Nombre incorrecto, ingrese un nombre válido (alfanumérico).");
            return;
        }

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
            if (response.errorCode == 'ER_DUP_ENTRY') {
                alert("Este ID ya se encuentra en nuestra base de datos.");
            } else {
                alert("Dispositivo agregado exitosamente.");
                this.props.navigation.navigate('Dashboard');
            }
        });
    }

    validar(text, tipo) {

        if (tipo == 'id'){
            var reg = /^\d+$/;
            if (reg.test(text)) {
                this.setState({validacionID:true, idDispositivo:text});
            } else if(text == ''){
                this.setState({validacionID:false, idDispositivo:''});
            } else {
                this.setState({validacionID:false, idDispositivo:text});
            }
        }

        if (tipo == 'nombre') {
            var reg = /^[a-z\d\-_\s]+$/i;
            if (reg.test(text)) {
                this.setState({validacionNombre:true, nombre:text});
            } else if(text == ''){
                this.setState({validacionNombre:false,  nombre:''});
            } else {
                this.setState({validacionNombre:false,  nombre:text});
            }
        }   
    }

    render() {

        return (
            
        <View style = {styles.container}>
     
            <KeyboardAvoidingView style={{}} behavior="padding" enabled>

            <View style={{alignItems:'center'}}>
                <Text style={{ fontSize:30, color:'green', fontWeight:'bold', marginBottom:70}}> Agregar Dispositivo </Text>
            </View>
            
            <View style={styles.vistaCentrada}>
            <Text style={{}}> Ingrese ID del dispositivo </Text>
                <TextInput 
                style = {[styles.inputID, 
                    !this.state.validacionID? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Ej:1893"
                placeholderTextColor = "grey"
                //autoCapitalize = "none"
                onChangeText = {(text) => this.validar(text, 'id')}
                maxLength={4}
            />

            <Text style={{}}> Ingrese nombre del dispositivo </Text>
                <TextInput 
                style = {[styles.inputNombreDispositivo, 
                    !this.state.validacionNombre? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Ej: dispositivo nº1"
                placeholderTextColor = "grey"
                //autoCapitalize = "none"
                onChangeText = {(text) => this.validar(text, 'nombre')}
                maxLength={20}
            />

            {/* <Text>idDispositivo: {this.state.idDispositivo} </Text>
            <Text>nombre: {this.state.nombre} </Text> */}
            </View>

            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.botonOk} onPress={this.onPressAgregarDispositivo.bind(this)}>
                <Text style={styles.textoBotonOk}> OK </Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            
        </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        flexDirection:'column',
        backgroundColor:'white',
    },
    vistaCentrada: {
        alignItems:'center'
    },
    inputID: {
        alignItems:'center',
        textAlign:'center',
        margin:20,
        borderColor: 'green',
        width:180, // Para 4 caracteres usar 55
        borderWidth: 2,
        borderRadius:20,
        paddingHorizontal: 10,
    },
    inputNombreDispositivo: {
        alignItems:'center',
        textAlign:'center',
        margin:20,
        borderColor: 'green',
        width:180, // Para 20 caracteres
        borderWidth: 2,
        borderRadius:20,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor:'red'
    },
    button: {
        alignItems:'center',
        width: 400,
        backgroundColor: 'green',
        borderRadius: 30,
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
        marginTop:70,
        marginRight:120,
        marginLeft:120,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        backgroundColor: 'green',
        borderRadius:30,
    },
});

export default AgregarDispositivo;