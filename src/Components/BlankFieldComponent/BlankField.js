import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../Theme';

const BlankField = ({title, btnText, showBtn,onPress}) => {
  return (
    <View style={style.textContainer}>
      <Text style={style.h1}>{title} </Text>
      {showBtn && (
        <TouchableOpacity
          onPress={onPress}
          style={style.btnConatiner}>
          <Text style={style.btnText}>{btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlankField;

const style = StyleSheet.create({
  btnConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themeColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: Colors.white,
  },
  h1: {
    fontSize: 20,
    color: Colors.input_Black,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
