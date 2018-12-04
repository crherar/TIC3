import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import styles from '../styles/styles/';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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

    async componentWillMount() {

        await this.fetchData();
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

    eliminarIncubacion = async() => {

        const { email, 
            //authorization, 
            idIncubacion 
        } = this.state;

        const response = await fetch("http://192.168.100.5:3000/eliminarIncubacion", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                //'authorization': 'Bearer ' + authorization,
            }, 
            body: JSON.stringify({email: email, 
            //authorization: authorization, 
            idIncubacion: idIncubacion
            })
        });
        const json = await response.json();
        console.log(json);
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
                centerComponent={{ text: 'DETALLE INCUBACIÓN', style: { color: '#fff' } }}
                //rightComponent={{ icon: 'home', color: '#fff' }}
            />
        );     
    }

    render() {

        return (

            <View>
            <List>
                <FlatList
                    data={this.state.data} 
                    renderItem={({item}) => {
                        var fechaInicio = moment(item.fechaInicio).format('YYYY-MM-DD').toString();
                        var fechaVolteo = moment(item.fechaVolteo).format('YYYY-MM-DD').toString();
                        var fechaFin = moment(item.fechaFin).format('YYYY-MM-DD').toString();
                        console.log("fechaInicio:", fechaInicio, "fechaFin:", fechaFin, "fechaVolteo:", fechaVolteo);
                        return(
                        <View>
                        <Text>ID Incubación: {item.id}</Text>
                        <Text>Nombre: {item.nombre}</Text>
                        <Text>Tipo Ave: {item.tipoAve}</Text>
                        <Text>Cantidad de Huevos: {item.cantHuevos}</Text>
                        <Text>Fecha Inicio: {moment(item.fechaInicio).format('DD/MM/YYYY --- HH:mm')}</Text>
                        <Text>Fecha Volteo de Huevos: {moment(item.fechaVolteo).format('DD/MM/YYYY --- HH:mm')}</Text>
                        <Text>Fecha Término: {moment(item.fechaFin).format('DD/MM/YYYY --- HH:mm')}</Text>
                        <Text>Estado: {item.estado}</Text>
                        <Text style={{marginTop:10, color:'red', fontWeight:'bold'}}>Temperatura: {item.temperatura}</Text>
                        <Text style={{marginBottom:10, color:'blue', fontWeight:'bold'}}>Humedad: {item.humedad}</Text>
                        <View style={{flex:1, flexDirection:'row', marginTop:10 }}>
                            <View style={styles1.circle1}/>
                            <Text> Fecha Inicio </Text> 
                        </View>
                        <View style={{flex:1, flexDirection:'row' }}>
                            <View style={styles1.circle2}/>
                            <Text> Fecha volteo huevos </Text> 
                        </View>
                        <View style={{flex:1, flexDirection:'row' }}>
                            <View style={styles1.circle3}/>
                            <Text> Fecha Término </Text> 
                        </View>

                        {/* <ListItem
                             roundAvatar
                             title={`Nombre: ${item.nombre}`}
                             subtitle={`Fecha Inicio: ${item.fechaInicio} Fecha Término: ${item.fechaFin} Tipo Ave:${item.tipoAve} Cantidad de Huevos:${item.cantHuevos}`}
                        /> */}  
              
                        <CalendarList
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            minDate={moment(item.fechaInicio).format('YYYY-MM-DD')}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={moment(item.fechaFin).format('YYYY-MM-DD')}
                            //hideExtraDays = {true}
                            pastScrollRange = {0}
                            futureScrollRange = {1}
                            scrollEnabled = {true}
                            showScrollIndicator = {true}
                            markedDates={{
                            [fechaInicio]: {selected: true, selectedColor: 'blue'},
                            [fechaVolteo]: {selected: true, selectedColor: 'red'},
                            [fechaFin]: {selected: true, selectedColor: 'green'},                                
                            }}
                              
                        />
            <View style={{alignItems:'center'}}>
                <Button
                title="[X] Eliminar"
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "red",
                    alignItems:"center",
                    width: 200,
                    height: 45,
                    margin:20,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={this.eliminarIncubacion.bind(this)}
                />
            </View>

                        </View>
                        
                        )}}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                
            </List>


            
            </View>

        ); 
    }   
}

const styles1 = StyleSheet.create({
    circle1: {
        alignItems:'center',
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: 'blue'
    },
    circle2: {
        alignItems:'center',
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: 'red'
    },
    circle3: {
        alignItems:'center',
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: 'green'
    }
});

export default visualizarIncubacion;