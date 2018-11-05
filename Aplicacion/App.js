import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './vistas/Login';
import RegistroUsuarios from './vistas/RegistroUsuarios';
import DashboardPrincipal from './vistas/DashboardPrincipal';
import AgregarIncubacion from './vistas/AgregarIncubacion';
import GestionDispositivos from './vistas/GestionDispositivos';
import Calendario from './vistas/Calendario';

export default class App extends React.Component {
    render() {
        return(
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({

    Login: Login,
    AgregarIncubacion: AgregarIncubacion,
    Calendario: Calendario,
    Dashboard: DashboardPrincipal,
    Registro: RegistroUsuarios,
    Gestion: GestionDispositivos,
});





