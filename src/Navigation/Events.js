import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddEvent from '../Screens/Events/AddEvents';
import CalenderEvent from '../Screens/Events/CalenderEvent';
import EditEvent from '../Screens/Events/EditEvent';

const Stack = createStackNavigator();
export const Events = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="CalenderEvent" component={CalenderEvent} />
      <Stack.Screen name="AddEvents" component={AddEvent} />
      <Stack.Screen name="EditEvent" component={EditEvent} />
    </Stack.Navigator>
  );
};
