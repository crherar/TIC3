import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles/';
console.disableYellowBox = true;

class RegistroUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'', 
            apellido:'',
            email:'',
            password1:'',
            password2:'',
            validacionNombre:true,
            validacionApellido:true,
            validacionEmail:true,
            validacionPassword1:true,
            validacionPassword2:true
        };
    }

    onPressRegistrar() {

        if(this.state.validacionNombre == false || this.state.nombre == '') {
            this.setState({validacionNombre:false});
            alert("Nombre incorrecto, ingrese un nombre válido.");
            return;
        }

        if(this.state.validacionApellido == false || this.state.apellido == '') {
            this.setState({validacionApellido:false});
            alert("Apellido incorrecto, ingrese un apellido válido.");
            return;
        }

        if(this.state.validacionEmail == false || this.state.email == '') {
            this.setState({validacionEmail:false});
            alert("Email incorrecto, ingrese un email válido.");
            return;
        }

        if (this.state.validacionPassword1 == false || this.state.validacionPassword2 == false || this.state.password1 == '' || this.state.password2 == '') {
            this.setState({validacionPassword:false, validacionPassword2:false});
            alert("Contraseña incorrecta, ingrese una contraseña válida.");
            return; 
        }
        
        if (this.state.password1 != this.state.password2) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        
        const{nombre, apellido, email, password1, password2} = this.state; // destructuracion de objetos

        var password = password1;
        
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

    validar(text, tipo) {

        if (tipo == 'nombre'){
            var reg = /^([^0-9]*)$/;
            if (reg.test(text)) {
                this.setState({validacionNombre:true, nombre:text});
            } else if(text == ''){
                this.setState({validacionNombre:false});
            } else {
                this.setState({validacionNombre:false});
            }
        }

        if (tipo == 'apellido') {
            var reg = /^([^0-9]*)$/;
            if (reg.test(text)) {
                this.setState({validacionApellido:true, apellido:text});
            } else if(text == ''){
                this.setState({validacionApellido:false});
            } else {
                this.setState({validacionApellido:false});
            }
        }

        if (tipo == 'email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(text)) {
                this.setState({validacionEmail:true, email:text});
            } else if(text == ''){
                this.setState({validacionEmail:false});
            } else {
                this.setState({validacionEmail:false});
            }
        }

        if (tipo == 'password1') {
            if(text == ''){
                this.setState({validacionPassword1:false});
            } else {
                this.setState({validacionPassword1:true, password1:text});
            }
        }

        if (tipo == 'password2') {
            if(text == ''){
                this.setState({validacionPassword2:false});
            } else {
                this.setState({validacionPassword2:true, password2:text});
            }
        }
        
    }

    // obtenerNombre = (inputNombre) => this.setState({nombre:inputNombre});

    // obtenerApellido = (inputApellido) => this.setState({apellido:inputApellido});

    // obtenerEmail = (inputEmail) => this.setState({email:inputEmail});

    // obtenerPassword = (inputPassword) => this.setState({password:inputPassword});

    render() {
        return (
        <View style = {styles.container}>

                {/* <View style={{flex:'1', flexDirection:'column'}}>
                    <Image source={require('../assets/nace.png')} style={styles.logo}/>
                </View> */}

                <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize:30, color:'green', fontWeight:'bold',}}> Registrar nueva cuenta </Text>
                </View>

                <TextInput 
                style = {[styles.input, 
                    !this.state.validacionNombre? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Nombre"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText={(text) => this.validar(text, 'nombre')}
                // textoError = {this.state.nombreError}
                />

                <TextInput
                style = {[styles.input, 
                    !this.state.validacionApellido? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Apellido"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText={(text) => this.validar(text, 'apellido')}
                //textoError = {this.state.apellidoError}
                />

                <TextInput 
                style = {[styles.input, 
                    !this.state.validacionEmail? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText={(text) => this.validar(text, 'email')}
                //textoError = {this.state.emailError}
                />

                <TextInput 
                style = {[styles.input, 
                    !this.state.validacionPassword1? styles.inputError:null]}
                secureTextEntry={true}
                underlineColorAndroid = "transparent"
                placeholder = "**********"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText={(text) => this.validar(text, 'password1')}
                //textoError = {this.state.passwordError}
                />

                <TextInput 
                style = {[styles.input, 
                    !this.state.validacionPassword2? styles.inputError:null]}
                secureTextEntry={true}
                underlineColorAndroid = "transparent"
                placeholder = "**********"
                //placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText={(text) => this.validar(text, 'password2')}
                //textoError = {this.state.passwordError}
                />
                <TouchableOpacity style={styles.botonLogin} onPress={this.onPressRegistrar.bind(this)}>
                <Text style={styles.textoBotonLogin}> CONTINUAR </Text>
                </TouchableOpacity>

        </View>
        );
    }   
}

export default RegistroUsuarios;