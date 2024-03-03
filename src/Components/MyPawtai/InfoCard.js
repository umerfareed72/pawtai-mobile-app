import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-tiny-toast';

const InfoCard = ({title, text, id}) => {
  const copyToClipboard = () => {
    Clipboard.setString(text);
    Toast.show('Text Copied', {
      position: Toast.position.TOP,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading1Container}>
        <Text style={styles.heading1}>{title}</Text>
      </View>
      <View style={styles.heading2Container}>
        <TouchableOpacity disabled={!id} onPress={copyToClipboard}>
          <Text style={styles.heading2}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: WP('2'),
  },
  heading1Container: {
    paddingVertical: WP('1'),
  },
  heading1: {
    fontSize: 12,
    color: colors.input_Black,
    fontWeight: '400',
  },
  heading2Container: {paddingVertical: WP('1')},
  heading2: {
    fontSize: 16,
    color: colors.input_Black,
    fontWeight: '500',
  },
});
