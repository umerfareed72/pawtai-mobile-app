import React from 'react';
import {
  Platform,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Colors, Fonts} from '../../../Theme/';

const TimePicker = ({...props}) => {
  return Platform.OS === 'ios' ? (
    <Modal
      visible={props.showTimer}
      animationType="fade"
      transparent={true}
      style={styles.flex_1}>
      <View style={styles.modalMainContainer}>
        <View style={styles.flex_1}>
          <TouchableWithoutFeedback onPress={props.onClosePress}>
            <View style={styles.flex_1} />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.modalContainer}>
          <DateTimePicker
            value={props.value}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={props.onChange}
          />
        </View>

        <TouchableWithoutFeedback onPress={props.onClosePress}>
          <View style={styles.flex_1} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  ) : (
    props.showTimer && (
      <DateTimePicker
        value={props.value}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={props.onChange}
      />
    )
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },

  modalMainContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingLeft: 14,
    paddingRight: 14,
  },

  modalContainer: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    width: '80%',
  },

  usernameText: {
    fontFamily: Fonts.LeagueSpartan,
    color: Colors.themeGreyNew,
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 10,
  },

  userPositionText: {
    fontFamily: Fonts.OpenSans,
    color: Colors.themeGreyText,
    fontSize: 17,
    fontWeight: '300',
    alignSelf: 'center',
    marginBottom: 10,
  },

  cancelContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});
