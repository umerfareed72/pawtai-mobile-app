import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
import FastImage from 'react-native-fast-image';

const CardComponent = ({...props}) => (
  <>
    <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
      {props?.btn ? (
        <View style={styles.btnStyle}>
          <Text style={styles.btnText}>{props.title[0]}</Text>
        </View>
      ) : (
        <FastImage
          source={
            props.staticImage
              ? props.image
              : {uri: props.image, priority: FastImage.priority.high}
          }
          style={styles.imageStyle}
        />
      )}
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  </>
);

export default CardComponent;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: Dimensions.get('screen').width / 2.5,
  },
  imageStyle: {
    marginTop: 5,
    width: 130,
    height: 130,
    borderRadius: 130,
    backgroundColor: colors.input_Black,
  },
  textStyle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  btnStyle: {
    height: 120,
    width: 120,
    borderRadius: 120,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeColor,
  },
  btnText: {
    fontSize: WP('10'),
    color: colors.white,
  },
});
