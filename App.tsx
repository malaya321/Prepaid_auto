import React, { useEffect } from 'react';
import RootNavigation from './src/Navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import Toast from 'react-native-toast-message';

import { toastConfig } from './src/Components/CustumToast/CustumToastConfig';

import { SafeAreaProvider } from 'react-native-safe-area-context';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification, {Importance} from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

 const App: React.FC = () => {


  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage:any) => {
  //     console.log('createPushNotificationListener', remoteMessage);
  //     const { notification, messageId } = remoteMessage;

  //     if (Platform.OS === 'ios') {
  //       PushNotificationIOS.addNotificationRequest({
  //         id: messageId,
  //         body: notification.body,
  //         sound: 'default',
  //         title: notification.title,
  //       });
  //     } else {
  //       PushNotification.createChannel(
  //         {
  //           channelId: 'Thoroughbred_notification',
  //           channelName: 'suyoghrms',
  //           channelDescription: 'A channel to categorize your notifications',
  //           playSound: true,
  //           soundName: 'default',
  //           importance: Importance.HIGH,
  //           vibrate: true,
  //         },
  //         (created: boolean) => {
  //           if (created) {
  //             console.log(`createChannel returned '${created}'`);
  //             PushNotification.localNotification({
  //               channelId: 'Thoroughbred_notification',
  //               id: messageId,
  //               message: notification.body,
  //               soundName: 'default',
  //               title: notification.title,
  //               vibrate: true,
  //               playSound: true,
  //             });
  //           } else {
  //             console.log(`createChannel returned '${created}'`);
  //             PushNotification.localNotification({
  //               channelId: 'Thoroughbred_notification',
  //               id: messageId,
  //               message: notification.body,
  //               soundName: 'default',
  //               title: notification.title,
  //               vibrate: true,
  //               playSound: true,
  //             });
  //           }
  //         }
  //       );
  //     }
  //   });

  //   return unsubscribe;
  // }, []);
  return (
<>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
        <Toast config={toastConfig} />
        </>
  );
};
export default App
