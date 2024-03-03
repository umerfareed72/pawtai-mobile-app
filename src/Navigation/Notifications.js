import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationSetting from '../Screens/Notification/NotificationSetting';
import MyNotification from '../Screens/Notification/MyNotification';

const Stack = createStackNavigator();

export const Notifications = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="MyNotifications" component={MyNotification} />

      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
    </Stack.Navigator>
  );
};
