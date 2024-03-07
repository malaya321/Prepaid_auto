import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../Navigation/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyWarpper from '../../Components/BodyWarpper';
import Loader from '../../Components/Loader';
import BackHeader from '../../Components/Backheader';
import { styles } from './StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi } from '../../CallApi';


type OrderDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderDetails'
>;
const OrderDetails = (prop:any) => {
    const {item} = prop.route.params;
    const [orderData, setOrderData] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<OrderDetailsScreenProp>();
    // const [profileData, setProfileData] = useState<any>('');
    const orderdetailsdata = async () => {
        const value = await AsyncStorage.getItem('access_token');
        const requestData = JSON.stringify({
          request_type: 'customer_booking_details',
          token: value,
          booking_id:item
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
            setOrderData(response.data);
          } else if (response.status === 0) {
            Alert.alert('App is logging on another device');
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
        orderdetailsdata();
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
      <BackHeader onPress={() => {navigation.goBack()}} title="Orders" />
      <View style={styles.detaiilscontainer}>
        <View style={styles.topcontainer}>
        
            <Text style={styles.bookingid}>{orderData.booking_id}</Text>
            <Text style={styles.pickuptext}>{orderData.pickup_location}</Text>
            <Text style={styles.customernameanddate}>Customer name : {orderData.customer_name}</Text>
            <Text style={styles.customernameanddate}>Booking date : {orderData.booking_date}</Text>
        </View>
        <Text style={styles.tripheader}>Trip Details</Text>
        <View style={styles.secondbox}>
            <Text style={styles.tripdetails}>Drop location : {orderData.drop_location}</Text>
            <Text style={styles.tripdetails}>Amount : {orderData.driver_amount}</Text>
            <Text style={styles.tripdetails}>Start time : {orderData.start_time}</Text>
            <Text style={styles.tripdetails}>End time : {orderData.end_time}</Text>
            <Text style={styles.tripdetails}>customer number : {orderData.customer_mobile}</Text>
            <Text style={styles.tripdetails}>Drop code : {orderData.drop_code}</Text>
            <Text style={styles.tripdetails}>pickup_code : {orderData.drop_code}</Text>

            

        </View>
         
      </View>
      
    </BodyWarpper>
  )
}

export default OrderDetails