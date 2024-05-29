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
        paddingLeft:9,
        color:Colors.black
    },
    bookingid:{
        fontSize:20,
        marginBottom:5,
        paddingLeft:10,
        color:Colors.black,
        fontWeight:'600'
    },
    customernameanddate:{
        marginBottom:5,
        paddingLeft:10,
        fontSize:15,
        color:Colors.black
    },
    tripheader:{
        fontSize:18,
        fontWeight:'600',
        marginTop:20,
        marginLeft:10,
        color:Colors.black
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
        paddingLeft:10,
        fontSize:15,
        color:Colors.black
        
    }
  
});
