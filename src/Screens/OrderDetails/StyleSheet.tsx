import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import Colors from '../../Constans/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    detaiilscontainer:{
        flex:1,
        backgroundColor:'#EEF1F5'
    },
    topcontainer:{
        backgroundColor:'#ffff',
        padding:10,
        
    },
    pickuptext:{
        fontSize:20,
        fontWeight:'600',
        marginBottom:10,
        paddingLeft:9
    },
    bookingid:{
        fontSize:10,
        marginBottom:5,
        paddingLeft:10
    },
    customernameanddate:{
        marginBottom:5,
        paddingLeft:10
    },
    tripheader:{
        fontSize:15,
        fontWeight:'600',
        marginTop:20,
        marginLeft:10
    },
    secondbox:{
        backgroundColor:'#ffff',
        width:'96%',
        alignSelf:'center',
        marginTop:5,
        padding:5,

    },
    tripdetails:{
        marginBottom:5,
        marginTop:5,
        paddingLeft:10
        
    }
  
});
