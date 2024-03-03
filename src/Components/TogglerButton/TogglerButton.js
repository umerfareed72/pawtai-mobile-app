import React, {useState} from 'react';
import {Switch, StyleSheet, Text, View} from 'react-native';
import {color} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
const TogglerButton = ({text, onPress, enable}) => {
  return (
    <View style={styles.container}>
      <View style={styles.toggle}>
        <Text style={styles.txt}>{text}</Text>
      </View>
      <View>
        <Switch
          value={enable}
          onValueChange={onPress}
          trackColor={'red'}
          offColor="grey"
          size="medium"
          onToggle={isOn => console.log('changed to : ', isOn)}
          trackColor={(true, colors.themeColor)}
        />
      </View>
    </View>
  );
};
export default TogglerButton;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: WP('3'),
  },
  toggle: {
    justifyContent: 'flex-start',
  },
  txt: {
    color: colors.themeColor,
    fontSize: 16,
  },
});
