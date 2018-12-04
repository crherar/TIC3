import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import styles from '../styles/styles/';
import { Button } from 'react-native-elements';
import MySwitchButton from 'switch-button-react-native';

class visualizarDispositivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            //authorization: this.props.navigation.state.params.authorization,
            idDispositivo:this.props.navigation.state.params.idDispositivo,
            data:[]
        }
    }

    componentWillMount() {

        this.fetchData();
    }

    fetchData = async() => {

        const { email, 
            //authorization, 
            idDispositivo 
        } = this.state;

        const response = await fetch("http://192.168.100.5:3000/visualizarDispositivo", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                //'authorization': 'Bearer ' + authorization,
            },
            body: JSON.stringify({email: email, 
                //authorization: authorization, 
                idDispositivo: idDispositivo})
        });
        const json = await response.json();
        console.log(json);
        this.setState({data: json.datos});
        console.log(this.state.data); 
}

eliminarDispositivo = async() => {

    const { email, 
        //authorization, 
        idDispositivo
    } = this.state;

    const response = await fetch("http://192.168.100.5:3000/eliminarDispositivo", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'authorization': 'Bearer ' + authorization,
        }, 
        body: JSON.stringify({email: email, 
        //authorization: authorization, 
        idDispositivo: idDispositivo
        })
    });
    const json = await response.json();
    console.log(json);
}

apagarDispositivo()  { 

    this.setState({estadoDispositivo:'Dispositivo apagado.'});
    const { email, 
        //authorization, 
        idDispositivo,
    } = this.state;

    const response = fetch("http://192.168.100.5:3000/Estado", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'authorization': 'Bearer ' + authorization,
        }, 
        body: JSON.stringify({email: email, 
        //authorization: authorization, 
        idDispositivo: idDispositivo,
        estado: '0'
        })
    });
    alert("Dispositivo apagado.");
    this.props.navigation.navigate('Dashboard');
    // const json = await response.json();
    // console.log(json);
}

encenderDispositivo()  { 

    //this.setState({estadoDispositivo:'Dispositivo apagado.'});
    const { email, 
        //authorization, 
        idDispositivo,
    } = this.state;

    const response = fetch("http://192.168.100.5:3000/Estado", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'authorization': 'Bearer ' + authorization,
        }, 
        body: JSON.stringify({email: email, 
        //authorization: authorization, 
        idDispositivo: idDispositivo,
        estado: '1'
        })
    });
    alert("Dispositivo encendido.");
    this.props.navigation.navigate('Dashboard');
    // const json = await response.json();
    // console.log(json);
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
                rightComponent={{ icon: 'power-off', type:'font-awesome', color: '#fff' }}
                //leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: `MIS INCUBACIONES (${this.state.email})`, style: { color: '#fff' } }}
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
                    renderItem={({item}) => (

                        
                        <ListItem
                            onPress={()=>this.props.navigation.navigate('visualizarIncubacion', {
                                //email:'crherar@gmail.com',
                                email: this.props.navigation.state.params.email,
                                //authorization: this.props.navigation.state.params.authorization,
                                idIncubacion:item.id,
                            })}
                            roundAvatar
                            title={`Nombre: ${item.nombre}`}
                            subtitle={`Temperatura: ${item.temperatura} Humedad: ${item.humedad}`}
                        />
                    )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                
            </List>


             <View style={{alignItems:'center'}}>
                <Button
                title="[X] Eliminar dispositivo"
                titleStyle={{ fontWeight: "700", alignItems:'center'}}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "red",
                    alignItems:"center",
                    width: 220,
                    height: 45,
                    margin:20,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={this.eliminarDispositivo.bind(this)}
                />
            </View>

            <View style={{alignItems:'center'}}>
                <Button
                title="Apagar Dispositivo"
                titleStyle={{ fontWeight: "700", alignItems:'center'}}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "red",
                    alignItems:"center",
                    width: 220,
                    height: 45,
                    margin:20,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={
                    this.apagarDispositivo.bind(this)}
                />
            </View>

            <View style={{alignItems:'center'}}>
                <Button
                title="Encender Dispositivo"
                titleStyle={{ fontWeight: "700", alignItems:'center'}}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "green",
                    alignItems:"center",
                    width: 220,
                    height: 45,
                    margin:20,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={
                    this.encenderDispositivo.bind(this)}
                />
            </View>
            
            
        </View>
            
        ); 
    }   
}

export default visualizarDispositivo;