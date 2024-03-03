import {View} from 'native-base';
import React, {memo} from 'react';
import {Text, TouchableOpacity, ImageBackground} from 'react-native';

import {Colors, Constants, Fonts, Images} from '../../Theme/';

const ImageButton = ({...props}) => (
  <TouchableOpacity
    onPress={props.buttonOnPress}
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>
      {props.buttonText}
      {Constants.FONT_TEXT}
    </Text>
  </TouchableOpacity>
);

export default ImageButton;

const styles = {
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.themeColor,
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: Fonts.LeagueSpartan,
    padding: 10,
  },
};
