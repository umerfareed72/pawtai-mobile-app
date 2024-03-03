import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ModalOption} from '../index';

import styles from './styles';

const TimePicker = ({...props}) => {
  return Platform.OS === 'ios' ? (
    <ModalOption visible={true} onClosePress={props.cancelOnPress}>
      <DateTimePicker
        value={props.value}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={props.onChangeIos}
      />
    </ModalOption>
  ) : (
    <DateTimePicker
      value={props.value}
      mode="time"
      is24Hour={false}
      display="spinner"
      onChange={props.onChange}
    />
  );
};

export default TimePicker;
