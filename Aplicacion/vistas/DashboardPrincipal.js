import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import styles from '../styles/styles/';
import { Button } from 'react-native-elements';

class DashboardPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'crherar@gmail.com', //this.props.navigation.state.params.email,
            //authorization: this.props.navigation.state.params.authorization,
            data:[]
        }
    }

    componentWillMount() {

        this.fetchData();
    }

    fetchData = async() => {

        const { 
            email, 
            //authorization 
        } = this.state;

        const response = await fetch("http://192.168.100.5:3000/consultarDispositivos", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                //'authorization': 'Bearer ' + authorization,
            },
            body: JSON.stringify({email: email})
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
            //text: `${this.state.email}`
                leftComponent={{ icon: 'user', type:'font-awesome', color: '#fff' }}
                centerComponent={{ text: `MIS DISPOSITIVOS`, style: { color: '#fff' } }}
                //rightComponent={{ icon: 'home', color: '#fff' }}
            />
            
        );     
    }

    render() {

        var email = this.state.email;

        return (

            <View>
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            onPress={()=>this.props.navigation.navigate('visualizarDispositivo', {
                                email:'crherar@gmail.com',
                                //email: this.props.navigation.state.params.email,
                                //authorization: this.props.navigation.state.params.authorization,
                                idDispositivo:item.id,
                            })}
                            roundAvatar
                            title={`${item.nombre}`}
                            subtitle={`ID Dispositivo:${item.id}`}// TEMP:${item.temp} \t HUM:${item.hum}`}
                        />
                    )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />

            </List>

            <View style={{alignItems:'center'}}>
                <Button
                title="+ Agregar Incubación"
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "green",
                    alignItems:"center",
                    width: 200,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={()=>this.props.navigation.navigate('AgregarIncubacion')}
                />
            </View>

            <View style={{alignItems:'center'}}>
                <Button
                title="+ Agregar Dispositivo"
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                    marginTop:20,
                    justifyContent:'center',
                    backgroundColor: "green",
                    alignItems:"center",
                    width: 200,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                containerStyle={{ marginTop: 20 }}
                onPress={()=>this.props.navigation.navigate('AgregarDispositivo')}
                />
            </View>
            
            </View>

        ); 
    }   
}

export default DashboardPrincipal;