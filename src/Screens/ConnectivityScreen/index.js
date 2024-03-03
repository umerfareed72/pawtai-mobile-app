import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import BlankField from '../../Components/BlankFieldComponent/BlankField';
import Header from '../../Components/Header/Header';
import MyStatusBar from '../../Components/Header/statusBar';
import {get_all_Posts} from '../../Redux/actions/post_pawtai.action';
import colors from '../../Theme/Colors';
import {checkConnected} from '../../Theme/Helper/ConnectivityHelper';
import style from './style';
import * as Types from '../../Redux/types/post_pawtai.types';
///Component
const ConnectivityScreen = props => {
  const dispatch = useDispatch();
  const checkConnection = async () => {
    const userDetail = await AsyncStorage.getItem('usertoken');
    const check = await checkConnected();
    if (check) {
      if (userDetail) {
        dispatch({type: Types.All_Publish_Post_Failure, payload: []});
        props?.navigation.navigate('HomeScreen');
      } else {
        props?.navigation.navigate('LoginScreen');
      }
    } else {
      props?.navigation.navigate('ConnectivityScreen');
    }
  };
  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />

      <View style={style.Container}>
        <Header
          backButton={false}
          title={'Connectivity Issue'}
          navigation={props.navigation}
        />
        <BlankField
          title="No Internet Connection"
          showBtn={true}
          btnText={'Try Again'}
          onPress={() => checkConnection()}
        />
      </View>
    </>
  );
};

export default ConnectivityScreen;
