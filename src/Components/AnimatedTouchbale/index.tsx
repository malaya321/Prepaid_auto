import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../../Constans/Colors';
import CommonFonts from '../../Constans/CommonFonts';


export interface AnimatedBtnProps {
  loader?: boolean;
  onPress: () => void;
  title: string;
  styles?: any;
  bgcolor?:any;
  height?:any;
  fontSize?:any;
  width?:any;
}

// const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedTouchable: React.FC<AnimatedBtnProps> = ({
  loader,
  onPress,
  title,
  styles,
  bgcolor,
  height,
  fontSize,
  width,
}) => {
  // const animatedWidth = useSharedValue('100%');
  // const animatedRadius = useSharedValue(20);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: animatedWidth.value,
  //     borderRadius: animatedRadius.value,
  //   };
  // });

  // useEffect(() => {
  //   if (loader) {
  //     animatedWidth.value = withTiming('15%', { duration: 500 });
  //     animatedRadius.value = withTiming(25, { duration: 500 });
  //   } else {
  //     animatedWidth.value = withTiming('100%', { duration: 500 });
  //     animatedRadius.value = withTiming(20, { duration: 500 });
  //   }
  // }, [loader]);

  return (

      <TouchableOpacity
      activeOpacity={0.7}
          disabled={loader}
          onPress={() => {
            onPress();
          }}
          style={[styles, {width:width||'90%',
          height:height|| 50,
          
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor:bgcolor|| '#FDC91C',
        borderWidth:2,
      borderColor:'#FDC91C'},
          
          ]}>
      
        
          {loader ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={{color: Colors.black, fontSize:fontSize|| 18,fontFamily:CommonFonts.buttonTextFont,marginTop:3}}>{title}</Text>
          )}

        </TouchableOpacity>

  );
};

export default AnimatedTouchable;
