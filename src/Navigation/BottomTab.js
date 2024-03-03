import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AddPost from '../Screens/Posts';
import {Text, View} from 'react-native';
import {Events} from './Events';
import {Notifications} from './Notifications';
import {Profile} from './Profile';
import {Home, Paws, Calendar, Notification, Pawtai} from '../Theme/SVG';
import colors from '../Theme/Colors';
import NavStyle from './NavStyle';
import {HomeStack} from './HomaStack';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import * as Types from '../Redux/types/notification.types';

const Tab = createMaterialBottomTabNavigator();
export function MyBottomTabs() {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={colors.nav_Color}
      inactiveColor={colors.inactive_nav_color}
      barStyle={NavStyle.barStyle}
      labeled={false}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate('HomeScreen');
          },
        })}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <View style={NavStyle.DotView}>
              {focused && <Text style={[NavStyle.DotStyle]}></Text>}
              <Home fill={color} stroke={color} width={25} height={35} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PostPawtai"
        component={AddPost}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate('PostPawtai');
          },
        })}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({color, focused}) => (
            <View style={NavStyle.DotView}>
              {focused && <Text style={[NavStyle.DotStyle]}></Text>}
              <Paws fill={color} width={25} height={35} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Events"
        component={Events}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate('Events');
          },
        })}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color, focused}) => (
            <View style={NavStyle.DotView}>
              {focused && <Text style={[NavStyle.DotStyle]}></Text>}
              <Calendar fill={color} width={25} height={35} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notifications}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate('Notification');
            PushNotification?.setApplicationIconBadgeNumber(0);
            dispatch({type: Types.Unread_Notifications_Success, payload: 0});
          },
        })}
        options={{
          tabBarBadge:
            notification?.unread_Notification <= 0
              ? null
              : notification?.unread_Notification,
          tabBarLabel: 'Notification',

          tabBarIcon: ({color, focused}) => (
            <View style={NavStyle.DotView}>
              {focused && <Text style={[NavStyle.DotStyle]}></Text>}

              <Notification fill={color} width={25} height={35} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate('Profile');
          },
        })}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon: ({color, focused}) => (
            <View style={NavStyle.DotView}>
              {focused && <Text style={[NavStyle.DotStyle, {left: 5}]}></Text>}
              <Pawtai fill={color} width={45} height={35} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
