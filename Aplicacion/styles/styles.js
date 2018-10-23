import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'space-around',
        backgroundColor:'white',
    },
    logo: {
        marginTop:0,
        width: 160, 
        height: 250,
        marginLeft:130,
    },
    input: {
        margin:-20,
        height: 40,
        marginRight:30,
        marginLeft:30,
        borderColor: 'rgb(0, 153, 51)',
        borderWidth: 2,
        borderRadius:0,
        paddingHorizontal: 10,
    },
    botonLogin: {
        alignItems:'center',
        // marginTop:30,
        marginRight:120,
        marginLeft:120,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: 'rgb(0, 153, 51)',
        borderRadius:0,
    },
    textoBotonLogin: {
        color:'white',
        fontWeight:'bold'
    },
    botonNoTienesCuentaAun: {
        color: 'rgb(0, 153, 51)',
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    textoNoTienesCuentaAun: {
        color: 'green',
        fontWeight:'bold',
        borderRadius: 5,
        alignItems:'center'
    },
    flatList: {

    }
});