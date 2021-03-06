import React, { Component } from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
    Picker
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';


import moment from 'moment';
console.disableYellowBox = true;


//import stylesExterno from '../styles/styles/';

//var calendario = require('./Calendario');

class AgregarIncubacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'crherar@gmail.com',
            dispositivos: [],
            dispositivoSeleccionado:'',
            nombre:'',
            cantHuevos:'',
            esVisible: false,
            fechaInicio:'',
            tipoAve:'',
            validacionNombre:true,
            validacionCantHuevos:true,
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

    async componentWillMount() {

        const response = await this.fetchData();
        this.setState({
            dispositivoSeleccionado: this.state.dispositivos[0]
          });
    }

    fetchData = async() => {

        const { email, authorization } = this.state;

        const response = await fetch("http://192.168.100.5:3000/obtenerDispositivos", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                //'authorization': 'Bearer ' + authorization,
            },
            body: JSON.stringify({email: 'crherar@gmail.com'})
        });
        const json = await response.json();
        console.log(json);
        this.setState({dispositivos: json.datos});
        console.log(this.state.dispositivos);
}

    onPressAgregarIncubacion() {

        if (this.state.nombre == '') {
            this.setState({validacionNombre:false});
            alert("El campo de nombre no puede estar vacío.");
            return;
        }

        if(this.state.cantHuevos == ''){
            this.setState({validacionCantHuevos:false});
            alert("El campo de cantidad de huevos no puede estar vacío.");
            return; 

        } if(this.state.validacionNombre == false) {
            this.setState({validacionNombre:false});
            alert("Nombre incorrecto, ingrese un nombre válido (alfanumérico).");
            return;
        }
        
        if (this.state.validacionCantHuevos == false) {
            this.setState({validacionCantHuevos:false});
            alert("El cantidad de huevos solo puede contener números.");
            return;
        }

        if (this.state.tipoAve == '') {
            alert("Debe seleccionar un tipo de ave.");
            return;
        }

        if (this.state.fechaInicio == '') {
            alert("Debe seleccionar una fecha para el inicio de la incubación.");
            return;
        }

        const{ email, dispositivoSeleccionado, nombre, cantHuevos, fechaInicio, tipoAve } = this.state; // destructuracion de objetos

        var datos = {
            email: email,
            idDispositivo: dispositivoSeleccionado, 
            nombre: nombre, 
            cantHuevos: cantHuevos, 
            tipoAve: tipoAve,
            fechaInicio: fechaInicio
        }

        console.log("Agregar Incubacion - Datos enviados:", datos);
        
        fetch('http://192.168.0.5:3000/agregarIncubacion', {
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
            if (response.code == 400) {
                alert("Error al crear la incubación.");
            } else {
                alert("La incubación se ha creado exitosamente.");
                this.props.navigation.navigate('Dashboard');
            }
        });
    }

    validar(text, tipo) {

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

        if (tipo == 'cantHuevos'){
            var reg = /^\d+$/;
            if (reg.test(text)) {
                this.setState({validacionCantHuevos:true, cantHuevos:text});
            } else if(text == ''){
                this.setState({validacionCantHuevos:false, cantHuevos:''});
            } else {
                this.setState({validacionCantHuevos:false, cantHuevos:text});
            }
        }
    }

    render() {


        let menuDispositivos = this.state.dispositivos.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

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
                <Text style={{ fontSize:30, color:'green', fontWeight:'bold'}}> Agregar Incubación </Text>
            </View>

            <Text>Seleccione la incubadora</Text>
            <View style={styles.inputTipoAve}>
                <Picker
                    selectedValue={this.state.dispositivoSeleccionado}
                    onValueChange={ (opDispositivo) => { this.setState({dispositivoSeleccionado:opDispositivo})}}
                    onChangeText={ (opDispositivo) => { this.setState({dispositivoSeleccionado:opDispositivo})}}>
                    {menuDispositivos}
                </Picker>
            </View>
                <Text style={{}}> Nombre de la incubación </Text>
                <TextInput 
                 style = {[styles.inputNombre, 
                    !this.state.validacionNombre? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Ej: Pollos 1"
                placeholderTextColor = "grey"
                onChangeText = {(text) => this.validar(text, 'nombre')}
                maxLength={20}
                />

                <Text style={{}}> Cantidad de huevos </Text>
                <TextInput 
                style = {[styles.inputCantHuevos, 
                    !this.state.validacionCantHuevos? styles.inputError:null]}
                underlineColorAndroid = "transparent"
                placeholder = "Ej: 80"
                placeholderTextColor = "grey"
                onChangeText = {(text) => this.validar(text, 'cantHuevos')}
                maxLength={2}
                />

                <Text style={{}}> Seleccione el tipo de ave a incubar </Text>

                <Dropdown 
                    onChangeText = {(opcion) =>  this.setState({tipoAve:opcion})}
                    data={data}
                    containerStyle={styles.inputTipoAve}
                />
                                    
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
    inputNombre: {
        alignItems:'center',
        textAlign:'center',
        margin:20,
        borderColor: 'green',
        width:180, // Para 4 caracteres usar 55
        borderWidth: 2,
        borderRadius:20,
        paddingHorizontal: 10,
    },
    inputCantHuevos: {
        alignItems:'center',
        textAlign:'center',
        margin:20,
        borderColor: 'green',
        width:180, // Para 20 caracteres
        borderWidth: 2,
        borderRadius:20,
        paddingHorizontal: 10,
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
     inputFecha: {
        // alignSelf:'center',
          margin:20,
          height: 40,
         //  marginRight:30,
         //  marginLeft:30,
         borderColor: 'rgb(0, 153, 51)',
         borderWidth: 2,
         borderRadius:20,
         paddingHorizontal: 10,
         // textAlignVertical: 'top'
     },
     inputError: {
        borderColor:'red'
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