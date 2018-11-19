import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './vistas/Login';
import RegistroUsuarios from './vistas/RegistroUsuarios';
import DashboardPrincipal from './vistas/DashboardPrincipal';
import AgregarDispositivo from './vistas/AgregarDispositivo';
import AgregarIncubacion from './vistas/AgregarIncubacion';
import visualizarDispositivo from './vistas/visualizarDispositivo';
import Calendario from './vistas/Calendario';

export default class App extends React.Component {
    render() {
        return(
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({

    Dashboard: DashboardPrincipal,  
    AgregarDispositivo: AgregarDispositivo,
    AgregarIncubacion: AgregarIncubacion,
    Login: Login, 
    visualizarDispositivo: visualizarDispositivo,
    Calendario: Calendario,
    Registro: RegistroUsuarios,
});





