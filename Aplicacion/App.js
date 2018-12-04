import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './vistas/Login';
import RegistroUsuarios from './vistas/RegistroUsuarios';
import DashboardPrincipal from './vistas/DashboardPrincipal';
import AgregarDispositivo from './vistas/AgregarDispositivo';
import AgregarIncubacion from './vistas/AgregarIncubacion';
import visualizarDispositivo from './vistas/visualizarDispositivo';
import visualizarIncubacion from './vistas/visualizarIncubacion';

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
    Registro: RegistroUsuarios,
    Dashboard: DashboardPrincipal,
    visualizarDispositivo: visualizarDispositivo,
    visualizarIncubacion: visualizarIncubacion,
    AgregarDispositivo: AgregarDispositivo,
    AgregarIncubacion: AgregarIncubacion,
    Calendario: Calendario,

});





