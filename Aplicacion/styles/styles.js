import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'white',
    },
    logo: {
        width: 130, 
        height: 220,
        marginBottom:20,
    },
    input: {
        margin:10,
        height: 40,
        marginRight:30,
        marginLeft:30,
        borderColor: 'rgb(0, 153, 51)',
        borderWidth: 2,
        borderRadius:20,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor:'red'
    },
    botonLogin: {
        alignItems:'center',
        marginTop:20,
        marginRight:120,
        marginLeft:120,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: 'rgb(0, 153, 51)',
        borderRadius:5,
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
        marginTop:20,
        color: 'green',
        fontWeight:'bold',
        borderRadius: 5,
        alignItems:'center'
    },
    flatList: {

    }
});