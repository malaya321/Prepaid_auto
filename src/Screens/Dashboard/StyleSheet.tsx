import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import Colors from '../../Constans/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flatlistcontainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '94%',
    alignSelf: 'center',
    marginTop: '3%',
    padding: 10,
    borderRadius: 5,
    zIndex:-20
  },
  textcontainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  textcontainerforlocaton: {
    flexDirection: 'row',
    width: '98%',
    alignItems: 'center',
    justifyContent:'space-between',
    
  },
  nametext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light_dark,
  },
  valuetext: {
    fontSize: 16,
    color: Colors.black,
    // marginLeft: 5,
  },
  valuetextbookingid: {
    fontSize: 16,
    color: Colors.black,
    fontWeight:'bold'
    // marginLeft: 5,
  },
  valuetextforlocation: {
    fontSize: 16,
    color: Colors.green,
    // marginLeft: 5,
  },
  headerWrapper:{
    // backgroundColor:'red',
    // padding:5,
    flexDirection:'row',
    alignItems:'center',
    position:'relative',
    zIndex:0,
  },
  profileImage:{
    height:50,
    borderRadius:500,
    width:50,
    overflow:'hidden'
 },
 filterDropDown:{
  // backgroundColor:'red',
  // position:'absolute',
width: '95%', 
  // zIndex:1,
  // top:'0%',
  flexDirection:'row',
  justifyContent:'space-between',
  alignSelf:'center',
  paddingTop:10,
  marginBottom:10
  // paddingVertical:10
 },
 filterbtn:{
  backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // width: '9%',
    alignSelf: 'center',
 
    padding: 5,
    borderRadius: 5,
    paddingHorizontal:10
 },
 filterbtntext:{
  fontSize: 14,
  color: Colors.black,
  fontWeight:'bold'
 }
});
