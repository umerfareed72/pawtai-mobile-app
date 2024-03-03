import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import colors from '../../Theme/Colors';
const Indicator = () => {
  return (
    <View style={styles.container}>
      <View>
        <BarIndicator color="white" />
      </View>
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeColor,
  },
});
