import React, {useEffect} from 'react';
import {View, Image, Text, Alert} from 'react-native';

import MyStatusBar from '../../Components/Header/statusBar';
import {Images} from '../../Theme';
import colors from '../../Theme/Colors';
import messaging from '@react-native-firebase/messaging';
import {
  LocalNotification,
  Notification_Listner,
  registerAppWithFCM,
  requestPermission,
} from '../../Theme/Helper/NotificationHandler';
import {AsyncStorage} from '../../Theme/Libraries';
import styles from './style';
import {useDispatch} from 'react-redux';
import {checkConnected} from '../../Theme/Helper/ConnectivityHelper';

const SplashScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    //Register App with FCM
    registerAppWithFCM();
    //Request Permissions and get Token
    requestPermission();
    //Notification Listner
    Notification_Listner(dispatch, props);
    //On  local Notification
    LocalNotification();

    const timeout = setTimeout(async () => {
      const userDetail = await AsyncStorage.getItem('usertoken');
      console.log(userDetail);
      const check = await checkConnected();
      if (userDetail) {
        if (check) {
          props.navigation.replace('HomeScreen');
        } else {
          props.navigation.replace('ConnectivityScreen');

        }
      } else {
        if (check) {
          props.navigation.replace('LoginScreen');
        } else {
          props.navigation.replace('ConnectivityScreen');
        }
      }
      return () => {
        timeout.clear();
      };
    }, 3000);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      <Image source={Images.SPLASH_LOGO} style={styles.LogoImage} />
    </View>
  );
};

export default SplashScreen;
