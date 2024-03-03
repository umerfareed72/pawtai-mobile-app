import React, {useEffect, useRef} from 'react';
import colors from '../../Theme/Colors';
import DatePicker from 'react-native-date-picker';
import {Dimensions} from 'react-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,

} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

const TimePickerModal = ({
  dateValue,
  onDateChange,
  show,
  onPressHide,
  onPressDone,
  minTime
 }) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    if (show) actionSheetRef?.current?.show();
  }, [show]);

  return (
    <ActionSheet
      gestureEnabled={true}
      closable={true}
      onClose={onPressHide}
      ref={actionSheetRef}
      containerStyle={styles.containerStyle}>
      <View style={styles.modalContainer}>
        <DatePicker
          fadeToColor={colors.white}
          textColor={colors.themeColor}
          mode={'time'}
          date={dateValue}
          androidVariant={'nativeAndroid'}
          onDateChange={onDateChange}
          minimumDate={minTime}
          locale='en'
          is24hourSource={'locale'}
         
        />
      </View>

      <View style={styles.bot}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPressDone}>
          <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: Dimensions.get('screen').height / 1.15,
  },

  modalContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: colors.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
  },
  bot: {
    bottom: 0,
    width: '100%',
  },
});
