import {Platform, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Colors from '../../Constans/Colors';

interface TomatoToastProps {
  props: any;
}
export const toastConfig = {
  success: ({props}: TomatoToastProps) => (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <View style={[styles.bar, {backgroundColor: Colors.green}]} />
      </View>
      <View style={styles.boxRight}>
        <Text style={[styles.headingText, {color: Colors.green}]}>
          {props.heading}
        </Text>
        <Text>{props.body}</Text>
      </View>
    </View>
  ),
  warning: ({props}: TomatoToastProps) => (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <View style={[styles.bar, {backgroundColor: Colors.warning}]} />
      </View>
      <View style={styles.boxRight}>
        <Text style={[styles.headingText, {color: Colors.warning}]}>
          {props.heading}
        </Text>
        <Text>{props.body}</Text>
      </View>
    </View>
  ),
  error: ({props}: TomatoToastProps) => (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <View style={[styles.bar, {backgroundColor: Colors.error}]} />
      </View>
      <View style={styles.boxRight}>
        <Text style={[styles.headingText, {color: Colors.error}]}>
          {props.heading}
        </Text>
        <Text>{props.body}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    borderRightColor: 10,
    backgroundColor: Colors.white,
    top: Platform.OS === 'ios' ? 20 : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxLeft: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  bar: {width: 8, height: verticalScale(40)},
  boxRight: {
    width: '85%',
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
  },
  headingText: {
    fontWeight: 'bold',
  },
});
