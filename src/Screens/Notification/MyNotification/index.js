import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import Card from '../../../Components/Dashboard/Card';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import colors from '../../../Theme/Colors';
import style from './style';
import {ActionSheet} from 'native-base';
import {useIsFocused} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  all_notification_list,
  all_notification_setting_list,
  delete_Notification,
  read_all_Notifications,
  read_Notifications,
  save_Notification_Info,
} from '../../../Redux/actions/notification.action';
import BlankField from '../../../Components/BlankFieldComponent/BlankField';
import moment from 'moment';
import Toast from 'react-native-tiny-toast';
import {PROFILE_IMAGE_URL} from '../../../Theme/routes';
import Indicator from '../../../Components/Loader/Indicator';
import Loader from '../../../Components/Loader/Loader';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
import {list_mentioned_pawtai} from '../../../Redux/actions/pawtai.action';

const MyNotification = ({navigation}) => {
  //States Declaration
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const [page, setPage] = useState(1);
  const [data, setData] = useState('loaded');
  const isFocus = useIsFocused();

  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  var BUTTONS = [
    'Stop Receiving This Notification',
    'Delete This Notification',
    'Cancel',
  ];
  var DESTRUCTIVE_INDEX = 1;
  var CANCEL_INDEX = 2;

  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      if (isFocus) {
        const requestBody = {
          page: 1,
          reload: true,
        };
        dispatch(
          all_notification_list(requestBody, () => {
            setData('loaded');
            setPage(2);
            console.log('Notification Loaded');
          }),
        );
        dispatch(all_notification_setting_list());
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  }, [isFocus]);

  //Open Notification Detail

  const clickOnNotification = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      setLoader(true);
      const ID = {
        id: item?.id,
        index: index,
      };
      const requestBody = {
        post_id: item?.post_id,
      };
      const requestBody1 = {
        id: item?.pawtai.id,
      };
      dispatch(list_mentioned_pawtai(requestBody1));

      dispatch(
        save_Notification_Info(requestBody, () => {
          if (
            item?.type == 'Like' ||
            item?.type == 'Reply' ||
            item.type == 'New Post'
          ) {
            navigation?.navigate('NotificationDetail');
          } else if (item?.type == 'New User') {
            navigation?.navigate('Profile');
          } else if (
            item?.type == 'New Event' ||
            item?.type == 'Cancel Event' ||
            item.type == 'Update Event'
          ) {
            navigation?.navigate('CalenderEvent');
          }
          console.log('Notification Info Saved');
          setLoader(false);
          dispatch(
            read_Notifications(ID, () => {
              console.log('Readed');
            }),
          );
        }),
      );
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  const readAllHanlder = async () => {
    const check = await checkConnected();
    if (check) {
      dispatch(
        read_all_Notifications(() => {
          console.log('All Readed');
        }),
      );
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  //Load More
  const loadMoreNotifications = async () => {
    const check = await checkConnected();
    if (check) {
      setLoader2(true);
      console.log('current Page', page);
      const requestBody = {
        page: page,
      };
      dispatch(
        all_notification_list(requestBody, res => {
          if (res == '') {
            setData(res);
            setLoader2(false);
          } else {
            setPage(page + 1);
            setData('loaded');
            setLoader2(false);
          }
        }),
      );
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      {!loader ? (
        <View style={style.Container}>
          <Header
            backButton={false}
            title={'Notification'}
            navigation={navigation}
            btnImage={true}
            onPress={() => navigation.navigate('NotificationSetting')}
          />

          {/* List of All Notifications */}
          {notification?.all_Notification != '' ? (
            <View style={style.contentContainer}>
              <TouchableOpacity
                onPress={() => {
                  readAllHanlder();
                }}
                style={style.readAllBtn}>
                <Text style={style.readtext}>Read All</Text>
              </TouchableOpacity>
              <FlatList
                ItemSeparatorComponent={() => (
                  <View style={style.cardSeparator} />
                )}
                refreshControl={
                  <RefreshControl
                    colors={['#9Bd35A', '#689F38']}
                    refreshing={loader}
                    onRefresh={async () => {
                      const check = await checkConnected();
                      if (check) {
                        const requestBody = {
                          page: 1,
                          reload: true,
                        };
                        dispatch(
                          all_notification_list(requestBody, () => {
                            setData('loaded');
                            setPage(2);
                          }),
                        );
                      } else {
                        navigation.replace('ConnectivityScreen');
                      }
                    }}
                  />
                }
                data={notification?.all_Notification}
                renderItem={({item, index}) => {
                  return (
                    <Card
                      onPressCard={() => clickOnNotification(item, index)}
                      onLongPress={() => {
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: 'Notification Setting',
                          },
                          buttonIndex => {
                            if (buttonIndex == 0) {
                              navigation.navigate('NotificationSetting');
                            } else if (buttonIndex == 1) {
                              const requestBody = {
                                unread: item?.is_read,
                                id: item?.id,
                              };
                              dispatch(
                                delete_Notification(requestBody, () => {
                                  Toast.show(
                                    'Notification Deleted Successfully',
                                    {
                                      position: Toast.position.TOP,
                                    },
                                  );
                                }),
                              );
                            }
                          },
                        );
                      }}
                      firstLetter={item?.pawtai?.name[0]}
                      profileImage={PROFILE_IMAGE_URL + item?.pawtai?.image}
                      title={item?.text != null ? item?.text : 'Username'}
                      date={`Last ${moment(item?.created_at).fromNow()}`}
                      is_read={!item?.isRead}
                    />
                  );
                }}
                ListFooterComponent={() => {
                  return data != '' ? (
                    <>
                      {loader2 && (
                        <View style={{paddingTop: 20}}>
                          <Loader loader_color={colors.black} />
                        </View>
                      )}
                    </>
                  ) : (
                    <View style={{padding: 30}}>
                      <BlankField title="No More Notification Available" />
                    </View>
                  );
                }}
                onEndReached={() => loadMoreNotifications()}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <BlankField title={'No Notification Available 🔔'} />
          )}
        </View>
      ) : (
        <Indicator />
      )}
    </>
  );
};

export default MyNotification;
