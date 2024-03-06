import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../../Navigation/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyWarpper from '../../Components/BodyWarpper';
import Loader from '../../Components/Loader';
import BackHeader from '../../Components/Backheader';

type OrderDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderDetails'
>;
const OrderDetails = () => {
    const [orderData, setOrderData] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<OrderDetailsScreenProp>();
  return (
    <BodyWarpper>
           {loading && <Loader loading={loading} />}
      <BackHeader onPress={() => {navigation.goBack()}} title="Orders" />
      <Text>OrderDetails</Text>
    </BodyWarpper>
  )
}

export default OrderDetails