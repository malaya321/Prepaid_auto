import React, {useState, useEffect} from 'react';
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
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import CustomTextInput from '../../../Components/FormInputField';

import {logo, purichakralogo, purilogoname, purilogo1} from '../../../Images';
import Strings from '../../../Constans/Strings';
import Colors from '../../../Constans/Colors';
import CommonFonts from '../../../Constans/CommonFonts';
import AnimatedTouchable from '../../../Components/AnimatedTouchbale';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../Navigation/RootStackPrams';
import {styles} from './StyleSheet';
// import {API} from '../../../CallApi';
import { CallApi } from '../../../CallApi';
import Loader from '../../../Components/Loader';

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
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateY: animation.value}]};
  });
  useEffect(() => {
    animation.value = withSpring(100);
  }, [animation]);
 
  const otpgenerate = async () => {
    const requestData =JSON.stringify(
     {
      request_type: 'send_driver_code',
      driver_mobile_number: loginSignUp,

      // driver_mobile_number: '8018364674',
    })
    setLoading(true);

    try {
      const response = await CallApi('POST','manage_driver',requestData);
      // console.log(response,'myresponse--->');
      if (response.status === 1) {
        navigation.navigate('Otp', {
          phone: loginSignUp,
          item: '',
        });
        setLoading(false);
      }else{
        setLoading(false);
        console.log('server error'); 
      }
      
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
    }
  };

  return (
    <View style={styles.logincontainer}>
       {loading&& <Loader loading={loading} />}
      <View style={styles.tophalfcontainer}>
        <Image
          source={require('../../../Images/autobackground.png')}
          style={styles.backgroundImage}
        />
      </View>

      <Animated.View style={[styles.loginbox, animatedStyles]}>
        <View style={styles.loginheadertext}>
          <Text style={styles.logintextheader}>Welcome to Prepaid Auto</Text>
          <Text style={styles.logintext}>Please Login to continue</Text>
        </View>
        <View style={styles.innerloginbox}>
          {/* <Text style={styles.labletext}>Enter MobileNumber</Text> */}
          <CustomTextInput
            placeholder="Enter Mobile Number"
            // onChangeText={handleChange}
            // value={username}
            onChangeText={number => setLoginSignUp(number)}
            containerStyle={{
              marginTop: 10,
              height: 50,
              width: '100%',
              textAlign: 'center',
            }}
            placeholderTextColor="#702963"
          />
          <View style={styles.btnContainer}>
            <AnimatedTouchable
              styles={{marginTop: 10}}
              width={'100%'}
              //  loader={prop.loader}
              title={Strings.SEND_OTP}
              onPress={() => {
                otpgenerate();

               setLoading(true)
              }}
            />
             
            {/* Your buttons or other UI elements */}
          </View>
          <Pressable style={styles.skipbutton}>
            <Text style={styles.skiptext}>
              By proceeding, you agree to stayatpurijagannatha's
              <Text style={{color: '#FDC91C'}}>
                {' '}
                Privacy Policy and T&Cs
              </Text>{' '}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;
