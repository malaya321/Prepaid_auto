import {View, Text, FlatList, Linking, Pressable, Image, Alert, Modal, ScrollView,Platform,Dimensions} from 'react-native';
import React, {useEffect, useState, useSyncExternalStore} from 'react';
import {orderlist} from '../../Constans/Constant';
import BodyWarpper from '../../Components/BodyWarpper';
import {styles} from './StyleSheet';
import Colors from '../../Constans/Colors';
import Icons from '../../Components/Icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigation/RootStackPrams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CallApi} from '../../CallApi';
import Loader from '../../Components/Loader';
import UserOtp from '../UserOtp';
import { SweetAlert, alerttype } from '../../Components/CustumToast/SweetAlert';
import moment from 'moment';
import {DatePicker, CalendarList} from 'react-native-common-date-picker';
type DashboardScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
const { height, width } = Dimensions.get('screen');
const Dashboard = () => {
  const [filtervalue, setFiltervalue] = useState('Today');
  const [loading, setLoading] = useState(false);
  const [filtershow, setFiltershow] = useState(false);
  const [orderData, setOrderData] = useState(false);
  const [otpmodal, setOtpmodal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [itemData, setItemData] = useState<any>();
  const [profileData, setProfileData] = useState<any>('');
  const navigation = useNavigation<DashboardScreenProp>();
  useEffect(() => {
    getData();
    profiledata()
  }, []);
  const getData = async () => {
    setFiltervalue('Today')
    const value = await AsyncStorage.getItem('access_token');
    const requestData = JSON.stringify({
      request_type: 'customer_booking_lists',
      token: value,
      itemsPerPage: 10,
      currentPage: 1,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD'),
      // driver_mobile_number: '8018364674',
    });
    setLoading(true);
    // console.log(requestData);
    try {
      const response = await CallApi('POST', 'manage_driver', requestData);
      // console.log(response, 'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.success === 1) {
        setRefreshing(false)
        setOrderData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        setRefreshing(false)
        console.log('server error');
      }
    } catch (error) {
      setLoading(false);
      setRefreshing(false)
      SweetAlert({
        type: alerttype.error,
        heading: 'Warning',
        body:'server error'
      });
      console.error('There was an error!', error);
    }
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
  const profiledata = async () => {
    // setProfileData('')
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
      } else{
        logoutfun(response.message)
        // Alert.alert('App is logging on another device');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
    }
  }
  const Starttrip=async()=>{
    const value = await AsyncStorage.getItem('access_token');
    const requestData = JSON.stringify({
      request_type: 'trip_start',
      token: value,
      booking_id: itemData.booking_id,
      start_otp: otpValue,
      // driver_mobile_number: '8018364674',
    });
    setLoading(true);
    console.log(requestData);
    try {
      const response = await CallApi('POST', 'manage_driver', requestData);
      console.log(response, 'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.success === 1) {
        setOtpmodal(false)
        Setfiltertype(filtervalue)
        // setOrderData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        if(response.booking_status=== 0){
          setOtpmodal(false)
          Setfiltertype(filtervalue)
          SweetAlert({
            type: alerttype.warning,
            heading: 'Warning',
            body:response.message,
          });
        }else{
          SweetAlert({
            type: alerttype.warning,
            heading: 'Warning',
            body:response.message,
          });
        }
        
     
        console.log('server error');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
      SweetAlert({
        type: alerttype.error,
        heading: 'Warning',
        body:'server error'
      });
    }
  }
  const Endtrip=async()=>{
    const value = await AsyncStorage.getItem('access_token');
    const requestData = JSON.stringify({
      request_type: 'trip_end',
      token: value,
      booking_id: itemData.booking_id,
      end_otp: otpValue,
      // driver_mobile_number: '8018364674',
    });
    setLoading(true);
    console.log(requestData);
    try {
      const response = await CallApi('POST', 'manage_driver', requestData);
      // console.log(response, 'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.success === 1) {
        setOtpmodal(false)
        Setfiltertype(filtervalue)
        // SweetAlert({
        //   type: alerttype.success,
        //   heading: 'Warning',
        //   body:response.message,
        // });
        // setOrderData(response.data);
        setLoading(false);
      } else {      
        // getData()
        setLoading(false);
        if(response.booking_status=== 0){
          setOtpmodal(false)
          Setfiltertype(filtervalue)
          SweetAlert({
            type: alerttype.warning,
            heading: 'Warning',
            body:response.message,
          });
        }else{
          SweetAlert({
            type: alerttype.warning,
            heading: 'Warning',
            body:response.message,
          });
        }
        console.log('server error');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
      SweetAlert({
        type: alerttype.error,
        heading: 'Warning',
        body:'server error'
      });
    }
  }
  const filterdata=async(start_date:any,end_date:any)=>{

    const value = await AsyncStorage.getItem('access_token');
    const requestData = JSON.stringify({
      request_type: 'customer_booking_lists',
      token: value,
      itemsPerPage: 10,
      currentPage: 1,
      start_date: moment(start_date).format('YYYY-MM-DD'),
      end_date: moment(end_date).format('YYYY-MM-DD'),
      // driver_mobile_number: '8018364674',
    });
    setLoading(true);
    // console.log(requestData);
    try {
      const response = await CallApi('POST', 'manage_driver', requestData);
      // console.log(response, 'myresponse--->');
      if(response.block_status=== 1){
        logoutfun(response.message)
        setLoading(false);
      }else if (response.success === 1) {
        setOrderData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log('server error');
      }
    } catch (error) {
      setLoading(false);
      SweetAlert({
        type: alerttype.error,
        heading: 'Warning',
        body:'server error'
      });
      console.error('There was an error!', error);
    }
  }
 const Setfiltertype=(type:any)=>{
  
  // let start_date = moment().format()
  // let end_date= moment().format()
  if(type==='Today'){
    setFiltervalue(type)
    let start_date = moment().format()
    let end_date= moment().format()
    filterdata(start_date,end_date)

  }else if(type==='Last weak'){
    setFiltervalue(type)
    let start_date = moment().subtract(7,'day').format()
    let end_date= moment().format()
    filterdata(start_date,end_date)
  }else if(type==='Last Month'){
    setFiltervalue(type)
    let start_date = moment().subtract(30,'day').format()
    let end_date= moment().format()
    filterdata(start_date,end_date)
  }else if(type==='Date Range'){
setDatePickerModal(true)
  }
  }
 const _handleRefresh = () => {
  setRefreshing(true)
  setFiltervalue('Today')
  getData()
  };
  return (
    <BodyWarpper>
      {loading && <Loader loading={loading} />}
     {otpmodal&& <UserOtp otpmodal={setOtpmodal} otpvalue={setOtpValue} onPress={()=>{
    if(itemData.start_flag===1){
      // Alert.alert('start')
      Starttrip()
    }else{
      // Alert.alert('end')
      Endtrip()
    }

     }} />}
      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            height: 55,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {/* <View style={{backgroundColor: Colors.white,width:'60%',}}></View>
      <View style={{    backgroundColor: Colors.purple,width:'40%'}}></View> */}

          <View style={styles.headerWrapper}>
            <Pressable
              style={{width: '15%'}}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: profileData?profileData.driver_image:'https://plus.unsplash.com/premium_photo-1675034393381-7e246fc40755?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                }}
              />
            </Pressable>
            <Pressable
              style={{width: '43%', marginLeft: '2%'}}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={{fontWeight:'600',color:Colors.black,fontSize:17}}>{profileData?.driver_name}</Text>
            </Pressable>
            <Pressable
              style={{
                width: '25%',
                backgroundColor: 'orange',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFiltershow(!filtershow)}>
              <Text style={{fontWeight:'600',color:Colors.black,fontSize:17}}>Filter</Text>
            </Pressable>

            <Pressable
              style={{
                width: '15%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }} onPress={()=>navigation.navigate('Notification')}>
              {/* <Text>ddd</Text> */}
              <Icons
                type="FontAwesome"
                name="bell"
                color={Colors.Primary}
                size={25}
              />
            </Pressable>
          </View>
        </View>
        {filtershow && (
          <View style={styles.filterDropDown}>
            <Pressable
              style={{
                ...styles.filterbtn,
                backgroundColor:
                  filtervalue === 'Today' ? Colors.green : Colors.white,
              }}
              onPress={() =>
                Setfiltertype('Today')
              //  setFiltervalue('Today')
            }>
              <Text
                style={{
                  ...styles.filterbtntext,
                  color: filtervalue === 'Today' ? Colors.white : Colors.black,
                }}>
                Today
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.filterbtn,
                backgroundColor:
                  filtervalue === 'Last weak' ? Colors.green : Colors.white,
              }}
              onPress={() => 
                Setfiltertype('Last weak')
              }>
              <Text
                style={{
                  ...styles.filterbtntext,
                  color:
                    filtervalue === 'Last weak' ? Colors.white : Colors.black,
                }}>
                Last Week
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.filterbtn,
                backgroundColor:
                  filtervalue === 'Last Month' ? Colors.green : Colors.white,
              }}
              onPress={() =>Setfiltertype('Last Month')}>
              <Text
                style={{
                  ...styles.filterbtntext,
                  color:
                    filtervalue === 'Last Month' ? Colors.white : Colors.black,
                }}>
                Last Month
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.filterbtn,
                backgroundColor:
                  filtervalue === 'Date Range' ? Colors.green : Colors.white,
              }}
              onPress={() => Setfiltertype('Date Range')}>
              <Text
                style={{
                  ...styles.filterbtntext,
                  color:
                    filtervalue === 'Date Range' ? Colors.white : Colors.black,
                }}>
                Date Range
              </Text>
            </Pressable>
          </View>
        )}
        <View style={{borderWidth:0.5,borderColor:"rgba(0,0,0,.3)",marginTop:3}}/>
      </View>
      <FlatList
        data={orderData}
        keyExtractor={(item, index) => 'key' + index}
        contentContainerStyle={{paddingBottom: 40}}
        ListEmptyComponent={() => (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 1.4
          }}>
            <Text style={{fontSize: 18,}}>
              No Results Found
            </Text>
          </View>
        )}
        refreshing={refreshing}
       onRefresh={_handleRefresh}

        renderItem={({item, index}) => {
          return (
            <Pressable style={styles.flatlistcontainer} onPress={()=>{
              navigation.navigate('OrderDetails', {
                item: item.booking_id,
              
              });
              
            }}>
              <View style={styles.textcontainerforlocaton}>
                {/* <Text style={styles.nametext} >Booking Id:</Text> */}
                <Text style={styles.valuetextbookingid}>{item.booking_id}</Text>
                <Pressable
                  onPress={() => Linking.openURL(`tel:${item.customer_mobile}`)}
                  // style={{backgroundColor:'red'}}
                >
                  <Icons
                    type="AntDesign"
                    name="phone"
                    color={Colors.green}
                    size={25}
                  />
                </Pressable>
              </View>

              <View style={{...styles.textcontainerforlocaton, marginTop: 5}}>
                <Text style={styles.nametext}>Pickup Location</Text>
                <Text style={styles.nametext}>Drop Location</Text>
              </View>
              <View style={styles.textcontainerforlocaton}>
                <Text style={styles.valuetextforlocation}>
                  {item.pickup_location}
                </Text>
                <Text style={styles.valuetextforlocation}>
                  {item.drop_location}
                </Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Passenger:</Text>
                <Text style={styles.valuetext}>{item.passenger_count}</Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Amount:</Text>
                <Text style={styles.valuetext}>₹ {item.driver_amount}</Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Name:</Text>
                <Text style={styles.valuetext}>{item.customer_name}</Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Vehicle Type:</Text>
                <Text style={styles.valuetext}>{item.vehicle_type}</Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Ride Category:</Text>
                <Text style={{...styles.valuetext,color:item.is_sharing==='yes'?Colors.green:Colors.Primary}}> {item?.is_sharing==='yes'?'Shared':'Reserved'}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View style={styles.textcontainer}>
                    <Text style={styles.nametext}>Date:</Text>
                    <Text style={styles.valuetext}>{item.booking_date}</Text>
                  </View>
                  <View style={styles.textcontainer}>
                    <Text style={styles.nametext}>Mobile No:</Text>
                    <Text style={styles.valuetext}>{item.customer_mobile}</Text>
                  </View>
                </View>

                {item.start_flag === 1 && item.end_flag === 0 ? (
                  <Pressable
                    style={{
                      width: '25%',
                      backgroundColor: Colors.green,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}
                    onPress={() => {setOtpmodal(true);
                      setOtpValue('')
                      setItemData(item)}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: 'bold',
                      }}>
                      START
                    </Text>
                  </Pressable>
                ) : item.start_flag === 0 && item.end_flag === 1 ? (
                  <Pressable
                    style={{
                      width: '25%',
                      backgroundColor: Colors.Primary,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      setOtpmodal(true);
                      setOtpValue('')
                      setItemData(item)
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: 'bold',
                      }}>
                      STOP
                    </Text>
                  </Pressable>
                ) : item.start_flag === 0 && item.end_flag === 0 ? null : null}
              </View>
            </Pressable>
          );
        }}
      />
       {datePickerModal && (
                  <Modal
                    animationType="slide"
                    visible={datePickerModal}>
                    <ScrollView style={{
                       ...Platform.select({
                        ios: {
                          marginTop: 50,
                        },
                        android: {
                          marginTop: 0,
                        },
                      }),
                    }}> 
                      <CalendarList
                        monthDisplayMode={'short'}
                        minDate={moment().subtract(90,'days').format()}
                        toolBarConfirmStyle={{
                          color: Colors.Primary,
                          // fontFamily: CommonFonts.normalHeading,
                        }}
                        toolBarCancelStyle={{
                          color: Colors.black,
                          // fontFamily: CommonFonts.normalHeading,
                        }}
                        titleText="Select Start date - End date"
                        titleStyle={{
                          // fontFamily: CommonFonts.buttonTextFont,
                          fontSize: 11,
                          color: Colors.black,
                        }}
                        maxDate={moment().format()}
                        cancel={() =>
                          setDatePickerModal(!datePickerModal)
                        
                        }
                        selectedDateMarkType="semiellipse"
                        selectedDateMarkColor="#E4B3FF"
                        selectedDateMarkRangeColor="#FBF2FF"
                        weeksTextStyle={{
                          color: Colors.Primary,
                          // fontFamily: CommonFonts.normalHeading,
                        }}
                        style={{marginBottom: 30}}
                        confirm={(data:any) => {
                          console.log(data);
                          if (data[0] != 0 && data[1] != 0) {
                            let checkedIn = data[0];
                            let checkedOut = data[1];
                            let datein =
                              moment(checkedIn).format('YYYY-MM-DD');
                            let dateout =
                              moment(checkedOut).format('YYYY-MM-DD');
                            console.log(dateout,datein);
                            setDatePickerModal(false)
                            setFiltervalue('Date Range')
                            filterdata(datein,dateout)
                          }
                        }}
                      />
                    </ScrollView>
                  </Modal>
                )}
    </BodyWarpper>
  );
};

export default Dashboard;
