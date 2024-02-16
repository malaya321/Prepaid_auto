import {StyleSheet, Platform} from 'react-native';

import CommonFonts from '../../../Constans/CommonFonts';
import Colors from '../../../Constans/Colors';


export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 10;
export const DEFAULT_CELL_BG_COLOR = Colors.white;
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.Primary,
    // height:'100%'
    // paddingTop: '30%',
  },
  containerdata: {
    // flex: 1,
    // backgroundColor: Colors.Primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems:'center',
    height:'100%'
    
   
    // paddingTop: '30%',
  },
  logoStyle: {
    alignSelf: 'center',
  },
  loginWhithAcStyle: {
    textAlign: 'center',
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: CommonFonts.normalHeading,
    marginVertical: verticalScale(15),
  },
  logoimageStyle: {
    height: moderateScale(100),
    width: moderateScale(300),
    marginBottom: verticalScale(15),
  },
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
    color: Colors.white,
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
    borderColor: '#fff',
    textAlign: 'center',
    marginRight:10,
    borderRadius:20,
    color:Colors.white,
   
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
    
  }
});

export default styles;
