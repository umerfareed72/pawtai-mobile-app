import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonWrapper, ButtonText} from './style';
import images from '../../Theme/Images';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';

const ImageButton = ({...props}) => (
  <ButtonWrapper
    shadowColor={props.shadowColor}
    color={props.color}
    onPress={props.buttonOnPress}>
    {props.isImage && <Image source={images.share} style={styles.imageStyle} />}
    <ButtonText textcolor={props.textcolor}>{props.buttonText}</ButtonText>
  </ButtonWrapper>
);

export default ImageButton;

const styles = StyleSheet.create({
  imageStyle: {
    tintColor: colors.white,
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: WP('2'),
  },
});
