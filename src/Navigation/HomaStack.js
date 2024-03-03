import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../Screens';
import PostDetailScreen from '../Screens/PostDetailScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />

    </Stack.Navigator>
  );
};
