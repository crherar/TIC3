import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AsyncStorage } from "react-native";
import styles from '../styles/styles/';


const ACCESS_TOKEN = 'access_token';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email:'', password:'', error:'', loading:false};
    }

    obtenerEmail = (inputEmail) => this.setState({email:inputEmail});

    obtenerPassword = (inputPassword) => this.setState({password:inputPassword});

    async getToken(accessToken) {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log("Token asignado: ", token);
        } catch (error) {
            console.log("Ha ocurrido un error: ", error);
        }
    }

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch (error) {
            console.log("Ha ocurrido un error: ", error);
        }
    }

    async onPressLogin() {

        const { navigate } = this.props.navigation;

        try {
            const { email, password } = this.state; // destructuracion de objetos
            var datos = {'email': email, 'password': password }
            let response = await fetch('http://192.168.100.5:3000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });
            let res = await response.json();
            console.log('************ RES LOGIN ************:\n', res, "\n************************************");
            if (res.status == 200) {
                this.setState({error:""});
                let accessToken = res.token;
                this.storeToken(accessToken);
                this.props.navigation.navigate('Dashboard', {
                    email: email,
                    authorization: accessToken
                });
            } else {
                let error = res;
                throw error;
            }
        } catch(error) {
            this.setState({error: error});
            console.log("error " + error);
        }
    }

    render() {
        return (
        <View style = {styles.container}>
            <Image source={require('../assets/incubasmart1.png')} style={styles.logo}/>
                <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                autoCapitalize = "none"
                onChangeText = {this.obtenerEmail}
                />
                <TextInput 
                style={styles.input} 
                secureTextEntry={true}
                underlineColorAndroid = "transparent"
                placeholder = "**********"
                autoCapitalize = "none"
                onChangeText = {this.obtenerPassword}
                />
                <TouchableOpacity style={styles.botonLogin} onPress={this.onPressLogin.bind(this)}>
                <Text style={styles.textoBotonLogin}> LOGIN </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textoNoTienesCuentaAun} onPress={()=>this.props.navigation.navigate('Registro')}>
                <Text style={styles.textoNoTienesCuentaAun}> ¿No tienes cuenta aún? </Text>
                </TouchableOpacity>
        </View>
        );
    }   
}

export default Login;


