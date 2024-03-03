import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import TogglerButton from '../../../Components/TogglerButton/TogglerButton';
import colors from '../../../Theme/Colors';
import style from './style';
import {
  all_notification_setting_list,
  save_notification_setiing,
} from '../../../Redux/actions/notification.action';
import {useIsFocused} from '@react-navigation/core';
import Toast from 'react-native-tiny-toast';
import { checkConnected } from '../../../Theme/Helper/ConnectivityHelper';
const NotificationSetting = props => {
  //State Declaration
  const [showReply, setShowReply] = useState(0);
  const [showLike, setShowLike] = useState(0);
  const [showMention, setShowMention] = useState(0);
  const [showEvents, setShowEvents] = useState(0);
  const [showNewUser, setNewUser] = useState(0);
  //Redux Declaraion
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const isFocues = useIsFocused();

  //Get All Notification Setting
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
   
    if (notification?.notification?.like == 1) {
      setShowLike(1);
    }
    if (notification?.notification?.reply == 1) {
      setShowReply(1);
    }
    if (notification?.notification?.mention == 1) {
      setShowMention(1);
    }
    if (notification?.notification?.event == 1) {
      setShowEvents(1);
    }
    if (notification?.notification?.new_user == 1) {
      setNewUser(1);
    }
  }else{
    props?.navigation.replace('ConnectivityScreen');
  }
  }, [isFocues]);

  //Change Reply Notification Setting
  const ReplyNotificationSetting = val => {
    const ReplyStatus = val ? 1 : 0;
    const data = {
      reply: ReplyStatus,
      like: showLike,
      mention: showMention,
      event: showEvents,
      new_user: showNewUser,
    };
    setShowReply(ReplyStatus);
    dispatch(
      save_notification_setiing(data, () => {
        dispatch(
          all_notification_setting_list(() => {
            if (val == true) {
              Toast.show('Reply Notification ON', {
                position: Toast.position.TOP,
              });
            } else {
              Toast.show('Reply Notification OFF', {
                position: Toast.position.TOP,
              });
            }
          }),
        );
      }),
    );
  };

  //Change Like Notification Setting
  const LikeNotificationSetting = val => {
    const LikeStatus = val ? 1 : 0;
    const data = {
      reply: showReply,
      like: LikeStatus,
      mention: showMention,
      event: showEvents,
      new_user: showNewUser,
    };
    setShowLike(LikeStatus);
    dispatch(
      save_notification_setiing(data, () => {
        dispatch(
          all_notification_setting_list(() => {
            if (val == true) {
              Toast.show('Like Notification ON', {
                position: Toast.position.TOP,
              });
            } else {
              Toast.show('Like Notification OFF', {
                position: Toast.position.TOP,
              });
            }
          }),
        );
      }),
    );
  };

  //Change Mention Notification Setting
  const MentionNotificationSetting = val => {
    const MentionStatus = val ? 1 : 0;
    const data = {
      reply: showReply,
      like: showLike,
      mention: MentionStatus,
      event: showEvents,
      new_user: showNewUser,
    };
    setShowMention(MentionStatus);
    dispatch(
      save_notification_setiing(data, () => {
        dispatch(
          all_notification_setting_list(() => {
            if (val == true) {
              Toast.show('Mention Notification ON', {
                position: Toast.position.TOP,
              });
            } else {
              Toast.show('Mention Notification OFF', {
                position: Toast.position.TOP,
              });
            }
          }),
        );
      }),
    );
  };

  //Change Event Notification Setting
  const EventNotificationSetting = val => {
    const EventStatus = val ? 1 : 0;
    const data = {
      reply: showReply,
      like: showLike,
      mention: showMention,
      event: EventStatus,
      new_user: showNewUser,
    };
    setShowEvents(EventStatus);
    dispatch(
      save_notification_setiing(data, () => {
        dispatch(
          all_notification_setting_list(() => {
            if (val == true) {
              Toast.show('Event Notification ON', {
                position: Toast.position.TOP,
              });
            } else {
              Toast.show('Event Notification OFF', {
                position: Toast.position.TOP,
              });
            }
          }),
        );
      }),
    );
  };

  //Change New User Notification Setting
  const NewUserNotificationSetting = val => {
    const NewUser = val ? 1 : 0;
    const data = {
      reply: showReply,
      like: showLike,
      mention: showMention,
      event: showEvents,
      new_user: NewUser,
    };
    setNewUser(NewUser);
    dispatch(
      save_notification_setiing(data, () => {
        dispatch(
          all_notification_setting_list(() => {
            if (val == true) {
              Toast.show('New User Notification ON', {
                position: Toast.position.TOP,
              });
            } else {
              Toast.show('New User Notification OFF', {
                position: Toast.position.TOP,
              });
            }
          }),
        );
      }),
    );
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />

      {/* Toggler Buttons */}

      <View style={style.Container}>
        <Header
          backButton={true}
          title={'Notification'}
          navigation={props.navigation}
        />
        <View style={style.contentContainer}>
          <TogglerButton
            enable={showReply == 1 ? true : false}
            onPress={value => ReplyNotificationSetting(value)}
            text={'Reply Notifications'}
          />
          <TogglerButton
            enable={showLike == 1 ? true : false}
            onPress={value => LikeNotificationSetting(value)}
            text={'Like Notifications'}
          />
          <TogglerButton
            enable={showMention == 1 ? true : false}
            onPress={value => MentionNotificationSetting(value)}
            text={'Mention Notifications'}
          />
          <TogglerButton
            enable={showEvents == 1 ? true : false}
            onPress={value => EventNotificationSetting(value)}
            text={'Event Notifications'}
          />
          <TogglerButton
            enable={showNewUser == 1 ? true : false}
            onPress={value => NewUserNotificationSetting(value)}
            text={'New User Notifications'}
          />
        </View>
      </View>
    </>
  );
};

export default NotificationSetting;
