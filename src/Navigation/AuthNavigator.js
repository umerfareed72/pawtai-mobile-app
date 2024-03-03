import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MyBottomTabs} from './BottomTab';
import {
  AddPawtai,
  ForgetPassword,
  JoinPawtai,
  LoginScreen,
  SignupScreen,
  SplashScreen,
  VerifyPawtai,
  WelcomeScreen,
} from '../Screens';
import ResetPassword from '../Screens/Auth/ResetPassword';
import VerifyScreen from '../Screens/Auth/VerifyPassword';
import VideoScreen from '../Screens/VideoScreen';
import MediaItemsScreen from '../Screens/MediaItemsScreen';
import NotificationDetail from '../Screens/Notification/NotificationDetail';
import ConnectivityScreen from "../Screens/ConnectivityScreen"
const Stack = createStackNavigator();

export function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ConnectivityScreen" component={ConnectivityScreen} />
        <Stack.Screen name="AddPawtai" component={AddPawtai} />
        <Stack.Screen name="JoinPawtai" component={JoinPawtai} />
        <Stack.Screen name="VerifyPawtai" component={VerifyPawtai} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
        <Stack.Screen name="ResetScreen" component={ResetPassword} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="HomeScreen" component={MyBottomTabs} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="MediaItemsScreen" component={MediaItemsScreen} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
