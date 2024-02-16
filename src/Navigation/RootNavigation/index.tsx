import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';
import { Text, Linking, View } from 'react-native';

import { NavigationContainer, } from '@react-navigation/native';
import Colors from '../../Constans/Colors';

import { RootStackParamList } from '../RootStackPrams';
import SplashScreen from '../../Screens/SplashScreen';
import Dashboard from '../../Screens/Dashboard';
import Login from '../../Screens/Auth/Login';
import Otp from '../../Screens/Auth/Otp';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const fallback = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: Colors.black }}>Loading...</Text>
    </View>
  );

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: true,
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (
    <NavigationContainer fallback={fallback}>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={screenOptions}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;