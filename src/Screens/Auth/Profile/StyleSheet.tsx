import { StyleSheet, Text, View,Dimensions,Platform } from 'react-native'
import Colors from '../../../Constans/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //  paddingHorizontal: 20,
        paddingTop: 40,
      },
      profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, 
        marginBottom: 10,
      },
      username: {
        fontSize: 24,
        fontWeight: 'bold',
        color:"#36454F"
      },
      infoContainer: {
        //  backgroundColor: '#f2f2f2',
        // padding: 50,
        borderRadius: 10,
        width:'100%',
        alignSelf:'center',
         marginBottom:20,
       marginTop:30
      
       
      },
      infoText: {
        fontSize: 16,
        fontWeight:'600',
        paddingLeft:20,
        color:'#585858'
      },
      textcontainer:{
        // backgroundColor:'#F6F8F7',
        // marginBottom: 20,
        paddingBottom:25,
        //  padding:10,
        // borderRadius:10,
        // width:'100%',
        // elevation:2,
        flexDirection:'row',
       alignItems:'center',
       overflow:'hidden',
      //  borderWidth:2,
      //  borderColor:'#F6F8F7',
      width:'95%',
      alignSelf:'center'
      },
      textinfopngs:{
        height:30,
        width:30,
       
      },
      logoutButton: {
        backgroundColor: '#FF3131',
        padding: 11,
        borderRadius: 3,
        width:"95%",
        alignSelf:'center',
         elevation:2,
         marginTop:40
      },
      logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center'
       
      },
      scrollContainer:{
        flexGrow: 1,
      }

})