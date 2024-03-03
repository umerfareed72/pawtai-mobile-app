import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPawtai from '../Screens/MyPawtai/MyPawtai';
import PawtaiProfile from '../Screens/MyPawtai/PawtaiProfile';
import EditProfile from '../Screens/MyPawtai/EditProfile';
const Stack = createStackNavigator();

export const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="MyPawtai" component={MyPawtai} />
      <Stack.Screen name="PawtaiProfile" component={PawtaiProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
