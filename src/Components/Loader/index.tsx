import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  Platform,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import Colors from '../../Constans/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import {autoloader} from '../../Images';
interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({loading}) => {
  //     const offset = useSharedValue(25);

  //   const animatedStyles = useAnimatedStyle(() => ({
  //     transform: [{ translateX: offset.value }],
  //   }));

  //   useEffect(() => {
  //     if(loading)
  //     offset.value = withRepeat(
  //       withTiming(-offset.value, { duration:1500 }),
  //       -1,
  //       true
  //     );
  //   }, []);

  return (
    <Modal
      transparent={loading}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      {loading ? (
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {/* <Animated.View style={[animatedStyles]} > */}
            {/* <Image
                        source={require('../../assets/LOGO_SMS.png')}
                        style={styles.logo}
                        resizeMode='center'
                    /> */}
            {/* </Animated.View> */}
            <Image
              source={autoloader}
              style={styles.logo}
              resizeMode="contain"
            />
            {/* <ActivityIndicator
                        animating={true}
                        color={Colors.white}
                        size="small"
                        style={styles.activityIndicator}
                    /> */}
            {/* <AnimatedEllipsis numberOfDots={3} animationDelay={300} minOpacity={.8} style={{fontSize:30,color:Colors.red}} /> */}
            <AnimatedEllipsis
              numberOfDots={3}
              minOpacity={0.4}
              animationDelay={200}
              style={{
                color: 'red',
                fontSize: 150,
                letterSpacing: -25,
                marginTop: Platform.OS == 'ios' ? -50 : -100,
              }}
            />
            {/* <Text style={styles.textStyle}>Smart Apartment</Text> */}
          </View>
        </View>
      ) : null}
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#333333',
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: 10,
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: moderateScale(5),
  },
  activityIndicator: {
    alignItems: 'center',
    // height: 80,
    // top:-10
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: scale(10),
    paddingBottom: moderateScale(20),
  },
  logo: {
    height: moderateScale(90),
    width: moderateScale(90),
  },
});
