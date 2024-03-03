import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EventText = ({title}) => {
  return (
    <View>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default EventText;

const styles = StyleSheet.create({
  textStyle: {
    color: '#7DE2BB',
    fontSize: 16,
  },
});
