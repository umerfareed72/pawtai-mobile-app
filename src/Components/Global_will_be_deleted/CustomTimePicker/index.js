import React from 'react';
import {Text, TouchableOpacity, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ModalOption} from '../index';
import moment from 'moment/min/moment-with-locales';
import {timeConversion} from '../../../Theme/utils';

const DatePicker = ({...props}) => {
  const [time, setTime] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const onChange = (e, value) => {
    if (e.type === 'dismissed') {
      setShow(false);
    } else {
      setShow(false);
      props.onChange(e, value);
    }
  };

  return (
    <View style={props.containerStyle}>
      <TouchableOpacity style={props.style} onPress={() => setShow(true)}>
        <Text style={props.textStyle}>
          {timeConversion(props.value) || timeConversion(new Date())}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <ModalOption visible={show} onClosePress={() => setShow(false)}>
          <DateTimePicker
            testID="timeTimePicker"
            value={props.value || time}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={props.onChange}
          />
        </ModalOption>
      ) : (
        show && (
          <DateTimePicker
            testID="timeTimePicker"
            value={props.value || time}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )
      )}
    </View>
  );
};

export default DatePicker;
