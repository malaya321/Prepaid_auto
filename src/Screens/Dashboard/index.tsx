import {View, Text, FlatList, Linking, Pressable, Image} from 'react-native';
import React, { useState, useSyncExternalStore } from 'react';
import {orderlist} from '../../Constans/Constant';
import BodyWarpper from '../../Components/BodyWarpper';
import {styles} from './StyleSheet';
import Colors from '../../Constans/Colors';
import Icons from '../../Components/Icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/RootStackPrams';
type DashboardScreenProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
const Dashboard = () => {
  const [filtervalue , setFiltervalue] = useState('Today')
  const navigation=useNavigation<DashboardScreenProp>()
  return (
    <BodyWarpper>
      <View style={{ width: '100%',}}>

     
      <View style={{flexDirection: 'row', width: '95%', height: 55,alignItems:'center',alignSelf:'center'}}>
        {/* <View style={{backgroundColor: Colors.white,width:'60%',}}></View>
      <View style={{    backgroundColor: Colors.purple,width:'40%'}}></View> */}

        <View style={styles.headerWrapper}>
          <Pressable style={{width:'15%',}} onPress={()=>navigation.navigate('Profile')}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1675034393381-7e246fc40755?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
              }}
            />
          </Pressable>
          <Pressable style={{width:'43%',marginLeft:'2%'}}onPress={()=>navigation.navigate('Profile')}>
          <Text>Lingaraj Sahoo</Text>
          </Pressable>
          <Pressable style={{width:'25%',backgroundColor:'orange', height:40,justifyContent:'center',alignItems:'center',borderRadius:5}}>
          <Text>Filter</Text>
          </Pressable>
       
          <View style={{width:'15%',height:40,justifyContent:'center',alignItems:'flex-end'}}>
          <Text>ddd</Text>
          </View>
        </View>
       
      </View>
      <View style={styles.filterDropDown}>
        <Pressable style={{...styles.filterbtn,backgroundColor:filtervalue==='Today'?Colors.green:Colors.white,}} onPress={()=>setFiltervalue('Today')}>
        <Text style={{...styles.filterbtntext,color:filtervalue==='Today'?Colors.white:Colors.black}}>Today</Text>
        </Pressable>
        <Pressable style={{...styles.filterbtn,backgroundColor:filtervalue==='Last weak'?Colors.green:Colors.white}}onPress={()=>setFiltervalue('Last weak')}>
        <Text style={{...styles.filterbtntext,color:filtervalue==='Last weak'?Colors.white:Colors.black}}>Last weak</Text>
          </Pressable>
          <Pressable style={{...styles.filterbtn,backgroundColor:filtervalue==='Last Month'?Colors.green:Colors.white}}onPress={()=>setFiltervalue('Last Month')}>

          <Text style={{...styles.filterbtntext,color:filtervalue==='Last Month'?Colors.white:Colors.black}}>Last Month</Text>
          </Pressable>
          <Pressable style={{...styles.filterbtn,backgroundColor:filtervalue==='Date Range'?Colors.green:Colors.white}}onPress={()=>setFiltervalue('Date Range')}>
          <Text style={{...styles.filterbtntext,color:filtervalue==='Date Range'?Colors.white:Colors.black}}>Date Range</Text>
          </Pressable>

         </View>
      </View>
      <FlatList
        data={orderlist}
        keyExtractor={(item, index) => 'key' + index}
        contentContainerStyle={{paddingBottom: 40}}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatlistcontainer}>
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
                <Text style={styles.nametext}>Name:</Text>
                <Text style={styles.valuetext}>{item.customer_name}</Text>
              </View>

              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Date:</Text>
                <Text style={styles.valuetext}>{item.booking_date}</Text>
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.nametext}>Mobile No:</Text>
                <Text style={styles.valuetext}>{item.customer_mobile}</Text>
              </View>
            </View>
          );
        }}
      />
    </BodyWarpper>
  );
};

export default Dashboard;
