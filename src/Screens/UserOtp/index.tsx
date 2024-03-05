import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';

import Colors from '../../Constans/Colors';

import {moderateScale} from 'react-native-size-matters';
interface UserOtpProps {
    onPress?: () => void;
    otpmodal?:any;
    otpvalue?:any
  }
// Define the PrinterScreen component
const UserOtp: React.FC<UserOtpProps> = ({onPress,otpmodal,otpvalue}) => {
  // Initialize state variables for the dropdown menus
  // const [printerData, setPrinterData] = useState([]);

  const [shipxPrinterValuetext, setShipxPrinterValuetext] = useState('');

  
  // Render the component
  return (
    <Pressable
      style={{
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        zIndex: 10000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }} onPress={()=>otpmodal(false)}>
      <Pressable
        style={{
          backgroundColor: Colors.white,
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          padding: 15,
          borderRadius: 10,
          overflow: 'hidden',}}
          onPress={()=>otpmodal(true)}>
        {/* Display the header text for the Ship X Print dropdown menu */}
        <Text style={styles.headertext}>OTP</Text>
        <TextInput
          onChangeText={(value)=>{
            setShipxPrinterValuetext(value)
            otpvalue(value)
          } }
          placeholder="OTP"
          value={shipxPrinterValuetext}
          style={styles.input}
        />
       
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'flex-end',
            // marginTop:15,
            color: Colors.white,
            fontWeight: '600',
          
            // backgroundColor:'green',
            padding: 10,
            width: '35%',
            backgroundColor: Colors.red,
            margin: moderateScale(10),
            borderRadius: moderateScale(5),
            overflow: 'hidden',
          }}
          onPress={onPress}>
          SUBMIT
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headertext: {
    marginLeft: 20,
    fontSize: moderateScale(18),
    marginTop: 15,
    marginBottom: 15,
  },
  ortext: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 15,
    borderColor: Colors.light_dark,
    marginTop: 8,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: 20,
  },
});
// Connect the component to the Redux store

// Export the connected component
export default UserOtp;
