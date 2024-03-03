import React from 'react';
import {Text, TouchableOpacity, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ModalOption} from '../index';
import moment from 'moment/min/moment-with-locales';

const DatePicker = ({...props}) => {
  const [date, setDate] = React.useState(new Date());
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
          {moment(props.value).isValid()
            ? moment(props.value).format('MM-DD-YYYY')
            : moment(date).format('MM-DD-YYYY')}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <ModalOption visible={show} onClosePress={() => setShow(false)}>
          <DateTimePicker
            testID="dateTimePicker"
            value={moment(props.value).isValid() ? props.value : date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={props.onChange}
            minimumDate={props.minimumDate}
          />
        </ModalOption>
      ) : (
        show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={moment(props.value).isValid() ? props.value : date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={props.minimumDate}
          />
        )
      )}
    </View>
  );
};

export default DatePicker;
