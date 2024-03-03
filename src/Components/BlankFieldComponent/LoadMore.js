import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import colors from '../../Theme/Colors';

const LoadMore = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.textStyle}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadMore;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  btnContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: colors.themeColor,
  },
  textStyle: {
    color: colors.white,
  },
});
