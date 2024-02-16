import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = (props:any) => {
    useEffect(()=>{
        getData()
    },[])
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@user_id');
          console.log(value, 'bapi');
          if (value == null) {
            props.navigation.replace('Login');
          } else {
            props.navigation.replace('Login');
          }
        } catch (e) {
          // error reading value
        }
      };
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen