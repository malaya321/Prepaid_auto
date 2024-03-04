import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Constans/Colors';
import { background } from '../../Images';

export interface BodyWarperProps {
  edges?: any;
  children: React.ReactNode;
}

const BodyWarpper: React.FC<BodyWarperProps> = ({ edges, children }) => {
  const insets = useSafeAreaInsets()
  return (

    <>
        <SafeAreaView style={styles.container} edges={edges ?? ['top']}>
      {/* <View style={{flexDirection:'row',width:'100%',height:Math.max(insets.top)}}>
      <View style={{backgroundColor: Colors.white,width:'60%',}}></View>
      <View style={{    backgroundColor: Colors.purple,width:'40%'}}></View>
      </View> */}

      <StatusBar
        animated={true}
        backgroundColor={Colors.light_dark}
        barStyle='light-content'
        // translucent
        // StatusBarAnimation='fade'
      />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
   
        {children}
   
  
      </View>
      </SafeAreaView>
    </>
   
  );
};

export default BodyWarpper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red,

  },
});