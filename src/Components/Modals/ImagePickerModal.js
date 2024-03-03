import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {Images} from '../../Theme';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';

const ImagePickerModal = ({
  show,
  onPressHide,
  onPressGallery,
  onPressCamera,
  isVideo,
}) => {
  return (
    <View style={styles.container}>
      <Modal onBackdropPress={onPressHide} isVisible={show}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onPressCamera} style={styles.btn}>
            <View style={styles.leftContainer}>
              <Image source={Images.themeCamera} style={styles.imageStyle} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.btnText}>Take Picture from Camera</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={onPressGallery} style={styles.btn}>
            <View style={styles.leftContainer}>
              <Image source={Images.gallery} style={styles.imageStyle} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.btnText}>
                Choose Picture{isVideo && '/Video'} from Gallery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 30,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: colors.input_light_gray,
    width: '100%',
  },

  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: WP('4'),
    fontWeight: '700',
    color: colors.input_Black,
    paddingVertical: WP('5'),
  },
  imageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '85%',
  },
  leftContainer: {
    width: '15%',

    paddingVertical: WP('5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
