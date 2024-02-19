import { StyleSheet, Text, View,Dimensions,Platform } from 'react-native'
import Colors from '../../Constans/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  flatlistcontainer:{
      backgroundColor:"white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
      width:'94%',alignSelf:'center',
      marginTop:'3%',
      padding:5
    },
   
})