import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import styles from '../styles/styles/';
import { Button } from 'react-native-elements';
import moment from 'moment';


class visualizarIncubacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            //authorization: this.props.navigation.state.params.authorization,
            // email:'crherar@gmail.com',
            idIncubacion:this.props.navigation.state.params.idIncubacion,
            data:[]
        }
    }

    componentWillMount() {

        this.fetchData();
    }

    fetchData = async() => {

        const { email, 
            //authorization, 
            idIncubacion 
        } = this.state;

        const response = await fetch("http://192.168.100.5:3000/visualizarIncubacion", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                //'authorization': 'Bearer ' + authorization,
            },
            body: JSON.stringify({email: email, 
                //authorization: authorization, 
                idIncubacion: idIncubacion})
        });
        const json = await response.json();
        console.log(json);
        this.setState({data: json.datos});
        console.log(this.state.data); 
}

    renderSeparator = () => {
        return (
            <View 
            style={{
                height: 1,
                width:'100%',
                //backgroundColor:'green',
                borderColor:'green',
                borderWidth:1,
            }}>
            </View>
        )
    }

    renderHeader = () => {
        return (
            <Header
            backgroundColor='green'
                leftComponent={{ icon: 'user', type:'font-awesome', color: '#fff' }}
                //leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'DETALLE INCUBACION', style: { color: '#fff' } }}
                //rightComponent={{ icon: 'home', color: '#fff' }}
            />
        );     
    }

    render() {

        var fechaInicio = moment(this.state.data.fechaInicio).format('DD-MM-YYYY HH:mm');
        var fechaFin = moment(this.state.data.fechaFin).format('DD-MM-YYYY HH:mm');


        return (

            <View>
            <List>
                <FlatList
                    data={this.state.data} 
                    renderItem={({item}) => ( 
                        <View>
                        <Text>ID Incubación: {item.id}</Text>
                        <Text>Nombre: {item.nombre}</Text>
                        <Text>Tipo Ave: {item.tipoAve}</Text>
                        <Text>Cantidad de Huevos: {item.cantHuevos}</Text>
                        <Text>Fecha Inicio: {moment(item.fechaInicio).format('DD/MM/YYYY --- HH:mm')}</Text>
                        <Text>Fecha Término: {moment(item.fechaFin).format('DD/MM/YYYY --- HH:mm')}</Text>
                        <Text>Estado: {item.estado}</Text>
                        {/* <ListItem
                             roundAvatar
                             title={`Nombre: ${item.nombre}`}
                             subtitle={`Fecha Inicio: ${item.fechaInicio} Fecha Término: ${item.fechaFin} Tipo Ave:${item.tipoAve} Cantidad de Huevos:${item.cantHuevos}`}
                        /> */}
                        </View>
                    )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                
            </List>
            
            </View>

        ); 
    }   
}

export default visualizarIncubacion;