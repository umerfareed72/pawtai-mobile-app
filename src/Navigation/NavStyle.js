import {Platform} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../Theme/Colors';

export default StyleSheet.create({
  barStyle: {
    backgroundColor: '#FFF',
    height: 80,
  },
  DotStyle: {
    position: 'absolute',
    fontSize: 8,
    color: 'white',
    height: 2,
    width: 10,
    backgroundColor: colors.light_Black,
    bottom:-3,
    borderWidth: 0.2,
    borderRadius: 5,
    zIndex: 10000,
    textAlign: 'center',
  },
  DotView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
