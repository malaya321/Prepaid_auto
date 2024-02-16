import {StyleSheet, Platform,Dimensions} from 'react-native';

import CommonFonts from '../../../Constans/CommonFonts';
import Colors from '../../../Constans/Colors';
const { width, height } = Dimensions.get('window');


export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 10;
export const DEFAULT_CELL_BG_COLOR = Colors.white;
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
const styles = StyleSheet.create({
 
  
 
 
 
  inputStyle: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(45),
    borderRadius: 50,
    paddingLeft: 20,
    // width: '93%',
    marginHorizontal: moderateScale(10),
    borderWidth: 0.7,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  btnContainer: {
    marginTop: verticalScale(10),
    // width:'95%'
  },
  skipbutton: {
    //  backgroundColor:'black',
    width:Platform.OS==='ios'?'90%': '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
padding:Platform.OS==='android'?5:10,
marginTop:10,
marginBottom:20,
    //  marginLeft:20
  },

  skiptext: {
    color: Colors.black,
    textAlign: 'center',
  },
 

 
  root: {flex: 1, padding: 10,},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20,marginLeft:10},
  cell: {
    width: 40,
    height: 40,
    lineHeight:33,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#cccccc',
    textAlign: 'center',
    marginRight:10,
    borderRadius:20,
    color:Colors.black,
   
  },
  focusCell: {
    borderColor: Colors.Primary,
  },
  resendotp:{
    // backgroundColor:'red',
    marginTop:10,
    width:'30%',
    marginLeft:20,
    alignSelf:'flex-end',
    
  },
  logincontainer:{
    flex:1,
    backgroundColor:"white",
    position:'relative'
  },
  tophalfcontainer:{
      // backgroundColor:'#3057B4',
      backgroundColor:'#702963',
      // height:'60%',
      //  transform: [{ rotate: '90deg'}],
      height:height/1.7,
      width:'100%',
      borderBottomLeftRadius:55,
      borderBottomRightRadius:55
     
      // marginTop:-130,



  },
  loginheadertext:{
      // position:'absolute',
      // zIndex:999,
      alignSelf:'center',
      // top:'9%',
      alignItems:'center',
      marginTop:20
     
  },
  logintext:{
      color:'#702963',
      fontSize:12,
      marginTop:5
      
  },
  logintextheader:{
      color:'#702963',
      fontSize:23,
      fontWeight:'500'
  },
  loginbox: {
      position: 'absolute',
      zIndex: 999,
      backgroundColor: 'white',
      width: '90%',
      height: '40%',
      borderRadius:50,
      alignSelf: 'center',
      top: '46%',
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    innerloginbox:{
      // backgroundColor:'red',
      width:'90%',
      alignSelf:'center',
      margin:'10%',
      marginTop:'7%'
    },
    labletext:{
      fontSize:12,
      color:'#702963'
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderBottomLeftRadius:55,
      borderBottomRightRadius:55
    },
   
  
   
});

export default styles;
