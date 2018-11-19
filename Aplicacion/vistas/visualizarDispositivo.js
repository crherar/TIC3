import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import styles from '../styles/styles/';
import { Button } from 'react-native-elements';

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
                centerComponent={{ text: `MIS INCUBACIONES`, style: { color: '#fff' } }}
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
                            roundAvatar
                            title={`Nombre: ${item.nombre}`}
                            subtitle={`Fecha Inicio: ${item.fechaInicio} Fecha Término: ${item.fechaFin} Tipo Ave:${item.tipoAve} Cantidad de Huevos:${item.cantHuevos}`}
                        />
                    )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
                
            </List>
            
            </View>

        ); 
    }   
}

export default visualizarDispositivo;