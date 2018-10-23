import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ListItem, List, Header} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles/';

class DashboardPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            authorization: this.props.navigation.state.params.authorization,
            data:[]
        }
    }

    componentWillMount() {

        this.fetchData();
    }

    fetchData = async() => {

        const { email, authorization } = this.state;

        const response = await fetch("http://192.168.100.5:3000/consultarDispositivos", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'  
            },
            body: JSON.stringify({email: email, authorization: authorization})
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
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: `${this.state.email}`, style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        );     
    }

    render() {

        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.nombre}
                            subtitle={`TEMP:${item.temp} \t HUM:${item.hum} \t CANT:${item.cantidadHuevos} `}
                        />
                    )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </List>
        ); 
    }   
}

export default DashboardPrincipal;