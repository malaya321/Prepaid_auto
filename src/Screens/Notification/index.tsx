import { View, Text, Dimensions, FlatList, Platform, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../Navigation/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyWarpper from '../../Components/BodyWarpper';
import Loader from '../../Components/Loader';
import BackHeader from '../../Components/Backheader';
import Colors from '../../Constans/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { CallApi } from '../../CallApi';
import { SweetAlert, alerttype } from '../../Components/CustumToast/SweetAlert';
import Icons from '../../Components/Icons';


const {width, height} = Dimensions.get('screen');


type NotificationscreenProp = NativeStackNavigationProp<
RootStackParamList,
'Notification'
>;
let stopFetchMore = false;
const Notification=()=>  {
    const navigation = useNavigation<NotificationscreenProp>();
    const [notification, setNotification] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [onrefloader, setOnrefloader] = useState(false);
    const [loadMorePageSet, setLoadMorePageSet] = useState(0);
    const [footerLoader, setFooterLoader] = useState(false);
    const [totalpage_number, setTotalpage_number] = useState(1);
    useEffect(() => {
        // _traficadvisorydata(0);
        getNotification()

      }, []);
  
      useEffect(() => {
        if (loadMorePageSet > 0) {
            // _traficadvisorydata(2);
         
        }
      }, [loadMorePageSet]);
     
      const onRefresh = () => {
        setLoadMorePageSet(0);
        setFooterLoader(false);
        setOnrefloader(true);
        setTotalpage_number(1);
            
        // setLoading(true)
        // _traficadvisorydata(0);
      };
      const VIEWABILITY_CONFIG = {
        minimumViewTime: 300,
        viewAreaCoveragePercentThreshold: 100,
        waitForInteraction: true,
      };
      const onScrollHandler = () => {
        console.log(totalpage_number, 'totalpage_number');
        if (Number(totalpage_number-1) > loadMorePageSet) {
          if (!stopFetchMore) {
            console.log(loadMorePageSet, 'loadMorePageSet');
            setLoadMorePageSet(loadMorePageSet + 1);
            // setFooterLoader(true);
            // stopFetchMore = true;
          }else{
            console.log('changes')
          }
        } else {
          setFooterLoader(false);
        }
      };
      const getNotification=async()=>{
        const value = await AsyncStorage.getItem('access_token');
        const requestData = JSON.stringify({
          token: value,
        });
        setLoading(true);
        console.log(requestData);
        try {
          const response = await CallApi('POST', 'get_notifications', requestData);
          console.log(response, 'myresponse--->');
          setLoading(false);
          if(response.status===1){
            setNotification(response.data)
          }else{
            SweetAlert({
              type: alerttype.warning,
              heading: 'Warning',
              body:response.message
            });
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
      
    return (
      <BodyWarpper>
       <BackHeader onPress={() => {navigation.goBack()}} title="Notifications" />
       {loading && <Loader loading={loading} />}
            <FlatList
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View style={styles.listemptyComponentStyle}>
                  <Text style={styles.searchResultNotFounfTextStyle}>
                    No Results Found
                  </Text>
                </View>
              )}
              onRefresh={() => onRefresh()}
              refreshing={onrefloader}
              removeClippedSubviews={true}
              viewabilityConfig={VIEWABILITY_CONFIG}
              showsVerticalScrollIndicator={false}
              
              onEndReached={onScrollHandler}
              onEndReachedThreshold={0.5}
              onScrollBeginDrag={() => {
                stopFetchMore = false;
              }}
              ListFooterComponent={() => (
                <View
                  style={{
                    marginBottom: Platform.OS === 'ios' ? 30 :10,
                    height: Platform.OS === 'ios' ? 80 : 50,
                    marginTop:10,
                    backgroundColor: footerLoader ?'#f6f6f6':Colors.white
                  }}>
                  {footerLoader && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        padding: 5,
                        color:'green'
                      }}>
                      Loading...
                    </Text>
                  )}
                </View>
              )}
      
              data={notification}
             
              renderItem={({item}) => {
                return (
                  <Pressable style={styles.orderCardWrapper}>
                    <View style={styles.htext}>
                    <Icons
          type='Feather'
          name="clock"
          color={Colors.red}
          size={20}
          style={{paddingTop:2}}
        />
         <Text style={{fontSize:17,    fontWeight: '600',
    paddingLeft: 5,
 color:Colors.Primary,}}>
                      
                      {' '}| {item.date_time}
                           </Text>
                    </View>
     
                   
                    <Text style={styles.ptext}>{item.message}</Text>
                  </Pressable>
                );
              }}
            />
    

      </BodyWarpper>
    );
  }


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
      },
  headerStyleContainer: {
    marginTop: Platform.OS === 'ios' ? '9%' : '0%',
    height: 60,
  },
  ptext: {
    fontSize: 16,
    // fontWeight: '400',
    lineHeight: 20,
  
    marginTop: 5,
    color: Colors.dark
  },
  htext: {
    // fontSize: 17,
    fontWeight: '600',
    paddingLeft: 5,
 color:Colors.Primary,
    backgroundColor: '#ccc',
    paddingVertical:5,
    flexDirection:'row',
    alignItems:'center'
  },
  orderCardWrapper: {
    // borderWidth: 1,
    marginTop: 15,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 10,
    // flexDirection: 'row',
    shadowColor: Colors.light_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    elevation: 5,
    paddingTop: 15,
  },
  listemptyComponentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2
  },
  searchResultNotFounfTextStyle: {
    // fontFamily: CommonFonts.normalHeading,
    fontSize: 15,
  },

});


export default Notification;