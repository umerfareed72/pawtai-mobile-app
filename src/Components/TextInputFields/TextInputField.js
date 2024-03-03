import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import colors from '../../Theme/Colors';
import EventText from '../Events/EventText';

const TextInputField = ({
  title,
  placehodler,
  onChangeText,
  placeholderTextColor,
  value,
  onBlur,
  touched,
  error,
  onSubmitEditing,
  disableFullscreenUI,
  autoCapitalize,
  returnKeyType,
  blurOnSubmit,
}) => {
  return (
    <View>
      <EventText title={title} />
      <TextInput
        style={styles.titleInput}
        placeholder={placehodler}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={placeholderTextColor}
        disableFullscreenUI={disableFullscreenUI}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        blurOnSubmit={blurOnSubmit}
      />
      {touched && error && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  titleInput: {
    borderWidth: 1,
    borderRadius: 37,
    borderColor: colors.input_light_gray,
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: colors.Red,
    paddingLeft: 10,
  },
});
