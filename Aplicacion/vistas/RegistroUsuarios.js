import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles/';

class RegistroUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            //nombreError:'', 
            apellido:'',
            //apellidoError:'',
            email:'',
            //emailError:'',
            password:'',
            //passwordError:'',
        };
    }

    onPressRegistrar() {

        const{nombre, apellido, email, password} = this.state; // destructuracion de objetos

        var datos = {'nombre': nombre, 'apellido': apellido, 'email': email, 'password': password}

        console.log(datos);
        
        fetch('http://192.168.100.5:3000/registro', {
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
            if (response.mensaje == 'ER_DUP_ENTRY') {
                alert("Este email ya se encuentra en uso.");
            }        
            else {
               alert('Usuario registrado existosamente.');
            }
        });
    }

    obtenerNombre = (inputNombre) => this.setState({nombre:inputNombre});

    obtenerApellido = (inputApellido) => this.setState({apellido:inputApellido});

    obtenerEmail = (inputEmail) => this.setState({email:inputEmail});

    obtenerPassword = (inputPassword) => this.setState({password:inputPassword});

    render() {
        return (
        <View style = {styles.container}>
                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Nombre"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.obtenerNombre}
                //textoError = {this.state.nombreError}
                />

                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Apellido"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.obtenerApellido}
                //textoError = {this.state.apellidoError}
                />

                <TextInput 
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.obtenerEmail}
                //textoError = {this.state.emailError}
                />

                <TextInput 
                style = {styles.input}
                secureTextEntry={true}
                underlineColorAndroid = "transparent"
                placeholder = "**********"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.obtenerPassword}
                //textoError = {this.state.passwordError}
                />

                <TextInput 
                style={styles.input} 
                secureTextEntry={true}
                underlineColorAndroid = "transparent"
                placeholder = "**********"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.obtenerPassword}
                //textoError = {this.state.passwordError}
                />
                <TouchableOpacity style={styles.botonLogin} onPress={this.onPressRegistrar.bind(this)}>
                <Text style={styles.textoBotonLogin}> REGISTRARSE </Text>
                </TouchableOpacity>

        </View>
        );
    }   
}

export default RegistroUsuarios;