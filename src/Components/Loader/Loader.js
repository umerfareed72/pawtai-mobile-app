import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import colors from '../../Theme/Colors';
const Loader = ({loader_color}) => {
  return (
    <View style={styles.container}>
      <SkypeIndicator
        size={30}
        color={loader_color != '' ? loader_color : colors.white}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
