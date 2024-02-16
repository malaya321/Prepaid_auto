import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  Pressable,
  ImageBackground,
} from 'react-native';

import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

import {logo, purichakralogo, purilogoname,purilogo1} from '../../../Images';
import Strings from '../../../Constans/Strings';
import Colors from '../../../Constans/Colors';
import CommonFonts from '../../../Constans/CommonFonts';
import AnimatedTouchable from '../../../Components/AnimatedTouchbale';
import {useNavigation,CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../Navigation/RootStackPrams';



const {width, height} = Dimensions.get('screen');
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
const Login = (props: any) => {
  const navigation = useNavigation<LoginScreenProp>();
  const [loginSignUp, setLoginSignUp] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [saveDeviceToken, setSaveDeviceToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [iosversion, setIosVerion] = useState('');
  const otpgenerate = () => {
    let formdata = new FormData();
    formdata.append('request_type', 'generate_otp');
    formdata.append('request_from', 'web');
    formdata.append('input_type', 'mobile');
    formdata.append('input_data', loginSignUp);
    console.log('formdata', formdata);
    navigation.navigate('Otp',{
        phone: loginSignUp,
        item: '',
    })
   
  };
  return (
   <ImageBackground  source={require('../../../Images/login-bg-4.jpg')} 
   style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerdata}>
          <View
            style={{
              // width: '25%',
          position:'absolute',
          top:Platform.OS==='ios'?'8%':'1%',
          right: 1,
          zIndex:1000,

            }}>
           <Text style={{fontSize:16,color:Colors.white}} onPress={()=>{
            {
           navigation.navigate('Dashboard')
            //   if (props.route.params.item.pageName === 'DrawerContainer') {
            //     props.navigation.dispatch(
            //       CommonActions.reset({
            //         index: 1,
            //         routes: [{ name: 'DrawerContainer' }],
            //       }),
            //     );
            //   }else{
            //     props.navigation.navigate(props.route.params.item.pageName, { item: props.route.params.item });
            //   }  
            }
             

           }}>{`Skip >>`} </Text>
          </View>
          <View style={styles.logoStyle}>
            <Image
              style={styles.logoimageStyle}
              resizeMode="contain"
              source={purichakralogo}
            />
          </View>
          <View style={{...styles.logoStyle,marginTop:-40}}>
            <Image
              style={styles.logoimageStyle}
              resizeMode="contain"
              source={purilogo1}
            />
          </View>
          <View
            style={{
              // backgroundColor: Colors.white,
              width:Platform.OS==='ios'?'100%':'90%',
              // borderRadius: 10,
              padding:10  ,
              // borderColor: '#FDC91C',
              // borderWidth:2   ,
              marginHorizontal:10 
                    }}>
            <Text style={styles.loginWhithAcStyle}>{Strings.LOGIN}</Text>
        
              <TextInput
                value={loginSignUp}
                placeholderTextColor={Colors.white}
                placeholder={Strings.MOBILE_MAIL_PLACEHOLDER}
                style={styles.inputStyle}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={value => {
                  setLoginSignUp(value);
                }}
              />
              <View style={styles.btnContainer}>
                <AnimatedTouchable
                  styles={{marginTop: 10}}
                  width={'95%'}
                  loader={props.loader}
                  title="Login"
                  onPress={() => {
                    otpgenerate();

                    
                  }}
                />
                {/* <TouchableOpacity onPress={() => {
                    otpgenerate();
                  }} style={styles.loginbtn}>
                  <Text style={styles.logintext}>{"LOGIN"}</Text>
                </TouchableOpacity> */}

               
              </View>
         

        <Pressable style={styles.skipbutton}>
            <Text style={styles.skiptext}>
              By proceeding, you agree to stayatpurijagannatha's
              <Text style={{color:Colors.warning}}> Privacy Policy and T&Cs</Text>{' '}
            </Text>
            </Pressable>
   
    
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </ImageBackground>
    
  );
};


export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    // paddingTop: '30%',
  },
  containerdata: {
    // flex: 1,
    // backgroundColor: Colors.Primary,
    alignSelf: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'transparent',
    height: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(45),
    borderRadius: 50,
    paddingLeft: 20,
    // width: '93%',
    marginHorizontal: moderateScale(10),
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    textAlign:'center',
    fontSize:15,
    color:'#fff'
    // color:Colors.white
  },
  btnContainer: {
    marginTop: verticalScale(15),

    
    // width:'100%'
  },
  loginbtn:{
width:'95%',
backgroundColor:Colors.warning,
alignSelf:'center',
textAlign:'center',
padding:15,
borderRadius:50
  },
  logintext:{
   textAlign:'center',
   fontSize:18,
   fontWeight:'800',
   textTransform:'uppercase'
  },
  skipbutton: {
    //  backgroundColor:'black',
    width:Platform.OS==='ios'?'90%': '100%',
    alignItems: 'center',
    justifyContent: 'center',
padding:Platform.OS==='android'?5:10,
marginTop:10,
marginBottom:20,
// marginLeft:Platform.OS==='android'? 5:null
    //  marginLeft:10
  },

  skiptext: {
    color: Colors.white,
    textAlign: 'center',
  },
});
