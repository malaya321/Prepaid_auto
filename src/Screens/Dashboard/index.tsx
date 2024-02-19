import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {orderlist} from '../../Constans/Constant';
import BodyWarpper from '../../Components/BodyWarpper';
import { styles } from './StyleSheet';
import Colors from '../../Constans/Colors';

const Dashboard = () => {
  return (
    <BodyWarpper>
       <View style={{flexDirection:'row',width:'100%',height:50}}>
      <View style={{backgroundColor: Colors.white,width:'60%',}}></View>
      <View style={{    backgroundColor: Colors.purple,width:'40%'}}></View>
      </View>
      <FlatList
        data={orderlist}
        keyExtractor={index => index + 'k'}
        contentContainerStyle={{paddingBottom:40}}
        renderItem={({item, index}) => {
          return(
          <View style={styles.flatlistcontainer}>
            <Text>pickup location: {item.pickup_location}</Text>
            <Text>drop location: {item.drop_location}</Text>
            <Text>passenger count: {item.passenger_count}</Text>
            <Text>customer name: {item.customer_name}</Text>
            <Text>booking id: {item.booking_id}</Text>
            <Text>booking date: {item.booking_date}</Text>
            <Text>customer mobile: {item.customer_mobile}</Text>
          </View>
          )
        }}
      />
    </BodyWarpper>
  );
};

export default Dashboard;
