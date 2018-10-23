import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './vistas/Login';
import RegistroUsuarios from './vistas/RegistroUsuarios';
import DashboardPrincipal from './vistas/DashboardPrincipal';
import GestionDispositivos from './vistas/GestionDispositivos';

export default class App extends React.Component {
    render() {
        return(
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Login: Login,
    Dashboard: DashboardPrincipal,
    Registro: RegistroUsuarios,
    Gestion: GestionDispositivos,
});





