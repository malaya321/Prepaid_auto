import React, { useEffect, useState } from 'react';
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
  Animated,
  ImageBackground,
  Easing,
  Alert
} from 'react-native';

import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import DeviceInfo from 'react-native-device-info';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Strings from '../../../Constans/Strings';
import Colors from '../../../Constans/Colors';
import { logo, purichakralogo, purilogoname,purilogo1 } from '../../../Images';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './StyleSheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Navigation/RootStackPrams';
import AnimatedTouchable from '../../../Components/AnimatedTouchbale';
import { CallApi } from '../../../CallApi';
import Loader from '../../../Components/Loader';
import { SweetAlert, alerttype } from '../../../Components/CustumToast/SweetAlert';
// import  Animated,{
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
// } from 'react-native-reanimated';


const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
type OtpScreenProp = NativeStackNavigationProp<RootStackParamList, 'Otp'>;
const Otp: React.FC<any> = (prop) => {
  const { phone, item } = prop.route.params;
  console.log(phone, 'props.route----->>');

  const navigation = useNavigation<OtpScreenProp>();
  const [value, setValue] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [saveDeviceToken, setSaveDeviceToken] = useState<string | null>('11111');
  // const animation = useSharedValue(0);
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {transform: [{translateY: animation.value}]};
  // });
  // useEffect(() => {
  //   animation.value = withSpring(100);
  // }, [animation]);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));



  const otpHandler = (message: string) => {
    let data = message.toString();
    console.log(data, 'hiii');
    if (data === null) {
      console.log(data, 'hiii1');
    } else {
      console.log(data, 'hiii2');
      const otp = /(\d{4})/g.exec(data)?.[1];
      setValue(otp || '');
      Keyboard.dismiss();
    }
  };

  const renderCell = ({ index, symbol, isFocused }: any) => {
    const hasValue = Boolean(symbol);

    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on the next event loop tick
    useEffect(() => {
      Animated.parallel([
        Animated.timing(animationsColor[index], {
          useNativeDriver: false,
          toValue: isFocused ? 1 : 0,
          duration: 250,
        }),
        Animated.spring(animationsScale[index], {
          useNativeDriver: false,
          toValue: hasValue ? 0 : 1,
          duration: hasValue ? 300 : 250,
        }),
      ]).start();
    }, [index, hasValue, isFocused]);
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);
    const animateCell = ({ hasValue, index, isFocused }: any) => {
      Animated.parallel([
        Animated.timing(animationsColor[index], {
          useNativeDriver: false,
          toValue: isFocused ? 1 : 0,
          duration: 250,
        }),
        Animated.spring(animationsScale[index], {
          useNativeDriver: false,
          toValue: hasValue ? 0 : 1,
          duration: hasValue ? 300 : 250,
        }),
      ]).start();
    };
    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };
  const logoutfun =(message:any)=>{
    Alert.alert(
      '',
      message,
              [
              
                {
                  text: 'OK',
                  onPress: async () => {
                    try {
                      await AsyncStorage.removeItem('access_token');
                      navigation.replace('Login');
                    } catch (error) {
                      console.error('Error logging out:', error);
                    }
                  },
                },
              ]
            );
  }
  const otpVerification = async (otp: string) => {
    const requestData =JSON.stringify(
     {
      request_type: 'driver_login',
      driver_mobile_number: phone,
      login_otp: otp || value

      // driver_mobile_number: '8018364674',
    })
    console.log(requestData,'responsedata--->>');
    
     setLoading(true);

    try {
      const response = await CallApi('POST','manage_driver',requestData);
      // console.log(response,'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.status === 1) {
        await AsyncStorage.setItem('access_token', response.token);
        navigation.replace('Dashboard');
        setLoading(false);
      }else{
        SweetAlert({
          type: alerttype.warning,
          heading: 'Warning',
          body:response.message
        });
        console.log('server error');
        setLoading(false);
      }
      console.log(response, 'mydata-->>');
    } catch (error) {
       setLoading(false);
      console.error('There was an error!', error);
    }
  };

  // const otpVerification = async (otp: string) => {
  //   // setLoader(true);
  //   let device_id = await DeviceInfo.getUniqueId();
  //   console.log(device_id, "llkkmmmm");
  //   let device_mode = Platform.OS;
  //   let otp_data = new FormData();
  //   otp_data.append('request_type', 'verify_otp');
  //   otp_data.append('input_type', 'mobile');
  //   otp_data.append('input_data', prop.route.params.phone);
  //   otp_data.append('otp', otp || value);
  //   otp_data.append('device_type', device_mode);
  //   otp_data.append('device_id', device_id);
  //   otp_data.append('device_token', saveDeviceToken || '');
  //   console.log(otp_data, 'otp_data')
  //   navigation.navigate('Dashboard')
  //   // prop.otpVerify(otp_data, navigation, (success: any, error: any, data: any) => {
  //   //   if (error) {
  //   //     // console.log('Error While getting Hash in server');
  //   //   } else {
  //   //     if (prop.route.params.item.pageName === 'DrawerContainer') {
  //   //       prop.navigation.dispatch(
  //   //         CommonActions.reset({
  //   //           index: 1,
  //   //           routes: [{ name: 'DrawerContainer' }],
  //   //         }),
  //   //       );
  //   //     } else {
  //   //       prop.navigation.navigate(prop.route.params.item.pageName, { item: prop.route.params.item });
  //   //     }
  //   //     // navigation.navigate('Otp',{phone:loginSignUp,
  //   //     //   item: props.route.params.item,})

  //   //     // console.log(data, 'hashGenerationMethod');

  //   //   }
  //   // });

  //   // ... rest of the code
  //   // navigation.navigate('DrawerContainer')
  //   // setLoader(false);
  // };

  return (
    <View style={styles.logincontainer}>
      {loading&& <Loader loading={loading} />}
      <View style={styles.tophalfcontainer}>
        <Image
          source={require('../../../Images/autobackground.png')}
          style={styles.backgroundImage}
          
        />
      </View>

      <View style={styles.loginbox}>
        <View style={styles.loginheadertext}>
          <Text style={styles.logintextheader}>Welcome to Prepaid Auto</Text>
          <Text style={styles.logintext}>Please Login to continue</Text>
        </View>
        <View style={styles.innerloginbox}>
          {/* <Text style={styles.labletext}>Enter MobileNumber</Text> */}
          <View style={{ padding: 10, width: '90%', alignSelf: 'center', justifyContent: 'space-between' }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View style={styles.btnContainer}>
              <AnimatedTouchable
                styles={{ marginTop: 10 }}
                width={'95%'}
                loader={prop.loader}
                title={Strings.VERIFY_OTP}
                onPress={() => {
                  otpVerification(value);

                  // setLoading(true)
                }}
              />
             {/* Your buttons or other UI elements */}
            </View>
            <TouchableOpacity style={styles.resendotp} onPress={() => {
                // otpgenerater();
              }}>
                <Text style={{color:'#000'}}>Resend OTP</Text>
              </TouchableOpacity>
            <Pressable style={styles.skipbutton}>
              <Text style={styles.skiptext}>
                By proceeding, you agree to stayatpurijagannatha's
                <Text style={{ color: '#FDC91C' }}> Privacy Policy and T&Cs</Text>{' '}
              </Text>
            </Pressable>
        </View>
       
      </View>

    </View>
    // <ImageBackground  source={require('../../../Images/login-bg-4.jpg')} 
    // style={styles.container}>
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //     <View style={styles.containerdata}>

    //       <View style={styles.logoStyle}>
    //         <Image
    //           style={styles.logoimageStyle}
    //           resizeMode="contain"
    //           source={purichakralogo}
    //         />
    //       </View>
    //       <View style={{ ...styles.logoStyle, marginTop: -40 }}>
    //         <Image
    //           style={styles.logoimageStyle}
    //           resizeMode="contain"
    //           source={purilogo1}
    //         />
    //       </View>
    //       <View
    //         style={{
    //           // backgroundColor: Colors.white,
    //           width: Platform.OS === 'ios' ? '100%' : '90%',
    //           borderRadius: 10,
    //           padding: 10,
    //           // borderColor: '#FDC91C',
    //           // borderWidth: 2
    //         }}>
    //         <Text style={styles.loginWhithAcStyle}>{Strings.LOGIN}</Text>
    //         <Text style={{ alignItems: 'center', textAlign: 'center',color:Colors.white }}>
    //           Enter the verification code{'\n'} send to your{' '}
    //           {prop.route.params.phone}<Text style={{ color: "#FDC91C"}} onPress={() => {
    //             prop.navigation.navigate('Login', { item: prop.route.params.item });
    //           }} > Change</Text>
    //         </Text>

    //         {/* <TextInput
    //           value={loginSignUp}
    //           placeholderTextColor={Colors.gray}
    //           placeholder={Strings.MOBILE_MAIL_PLACEHOLDER}
    //           style={styles.inputStyle}
    //           keyboardType="email-address"
    //           autoCapitalize="none"
    //           onChangeText={value => {
    //             setLoginSignUp(value);
    //           }}
    //         /> */}
    //         <View style={{ padding: 10, width: '90%', alignSelf: 'center', justifyContent: 'space-between' }}>


    //           <CodeField
    //             ref={ref}
    //             {...props}
    //             // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
    //             value={value}
    //             onChangeText={setValue}
    //             cellCount={CELL_COUNT}
    //             rootStyle={styles.codeFieldRoot}
    //             keyboardType="number-pad"
    //             textContentType="oneTimeCode"
    //             renderCell={({ index, symbol, isFocused }) => (
    //               <Text
    //                 key={index}
    //                 style={[styles.cell, isFocused && styles.focusCell]}
    //                 onLayout={getCellOnLayoutHandler(index)}>
    //                 {symbol || (isFocused ? <Cursor /> : null)}
    //               </Text>
    //             )}
    //           />
    //         </View>
    //         <View style={styles.btnContainer}>
    //           <AnimatedTouchable
    //             styles={{ marginTop: 10 }}
    //             width={'95%'}
    //             loader={prop.loader}
    //             title={Strings.VERIFY_OTP}
    //             onPress={() => {
    //               otpVerification(value);

    //               // setLoading(true)
    //             }}
    //           />
               
              

    //           {/* Your buttons or other UI elements */}
    //         </View>
    //         <TouchableOpacity style={styles.resendotp} onPress={() => {
    //             // otpgenerater();
    //           }}>
    //             <Text style={{color:'#fff'}}>Resend OTP</Text>
    //           </TouchableOpacity>



    //         <Pressable style={styles.skipbutton}>
    //           <Text style={styles.skiptext}>
    //             By proceeding, you agree to stayatpurijagannatha's
    //             <Text style={{ color: '#FDC91C' }}> Privacy Policy and T&Cs</Text>{' '}
    //           </Text>
    //         </Pressable>


    //       </View>
    //     </View>
    //   </TouchableWithoutFeedback>

    // </KeyboardAvoidingView>
    // </ImageBackground>
  );
};



export default Otp;
