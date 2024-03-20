import {View, Text, Image, Alert, Pressable,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import BodyWarpper from '../../../Components/BodyWarpper';
import BackHeader from '../../../Components/Backheader';
import {styles} from './StyleSheet';
import {autoloader} from '../../../Images/index';
import {CallApi} from '../../../CallApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Components/Loader';
import { useNavigation } from '@react-navigation/native';
import {
  mobilenum,
  checkin,
  checkout,
  address,
  licence,
} from '../../../Images/index';
import { RootStackParamList } from '../../../Navigation/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

type ProfileScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProp>()
  const [profileData, setProfileData] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
             
              await AsyncStorage.removeItem('access_token');
              setProfileData('')
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
              // await AsyncStorage.removeItem('profile_data');
              
              navigation.replace('Login');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ]
    );
  };

  const profiledata = async () => {
    const value = await AsyncStorage.getItem('access_token');
    const requestData = JSON.stringify({
      request_type: 'get_driver_details',
      token: value,
    });
    console.log(requestData, 'myresponsedata---');
    setLoading(true);
    try {
      const response = await CallApi('POST', 'manage_driver', requestData);
      console.log(response, 'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.success === 1) {
        setLoading(false);
        setProfileData(response.data);
        await AsyncStorage.setItem('profile_data', JSON.stringify(response.data));
      } else if (response.status === 0) {
        logoutfun(response.message)
        setLoading(false);
      } else {
        setLoading(false);
        console.log('server error');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
    }
  };
  useEffect(() => {
    profiledata();
  }, []);
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
  return (
    <BodyWarpper>
      {loading && <Loader loading={loading} />}
      <BackHeader onPress={() => {navigation.goBack()}} title="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: profileData.driver_image}}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{profileData.driver_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textcontainer}>
            <Image source={mobilenum} style={styles.textinfopngs} />
            <Text style={styles.infoText}>
              mobile number : {profileData.driver_mobile_number}
            </Text>
          </View>
          <View style={styles.textcontainer}>
            <Image source={checkin} style={styles.textinfopngs} />
            <Text style={styles.infoText}>
              last checkin time : {profileData.last_checkin_time}
            </Text>
          </View>
          <View style={styles.textcontainer}>
            <Image source={checkout} style={styles.textinfopngs} />
            <Text style={styles.infoText}>
              last checkout time : {profileData.last_checkout_time}
            </Text>
          </View>
          <View style={styles.textcontainer}>
            <Image source={address} style={styles.textinfopngs} />
            <Text style={styles.infoText}>address : {profileData.address}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Image source={licence} style={styles.textinfopngs} />
            <Text style={styles.infoText}>
              dl number : {profileData.driver_dl_number}
            </Text>
          </View>
        </View>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
      </View>
      </ScrollView>
    </BodyWarpper>
  );
};

export default Profile;
