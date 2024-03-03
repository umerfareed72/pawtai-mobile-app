import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Dimensions} from 'react-native';

export const week_days = [
  {
    id: 1,
    title: 'Monday',
    status: 0,
  },
  {
    id: 2,
    title: 'Tuesday',
    status: 0,
  },
  {
    id: 3,
    title: 'Wednesday',
    status: 0,
  },
  {
    id: 4,
    title: 'Thursday',
    status: 0,
  },
  {
    id: 5,
    title: 'Friday',
    status: 0,
  },
  {
    id: 6,
    title: 'Saturday',
    status: 0,
  },
  {
    id: 7,
    title: 'Sunday',
    status: 0,
  },
];
export const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

export let authHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export let header = async () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${await GetToken()}`,
});
export let GetToken = async () => {
  const token = await AsyncStorage.getItem('usertoken');
  return token;
};

export default Constants;
