import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';

const LogoutModal = ({show, onPressHide, onPress,title}) => {
  return (
    <View style={styles.container}>
      <Modal onBackdropPress={onPressHide} isVisible={show}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.header}>{title}</Text>
          </View>
          <View style={styles.rowAlign}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
              <Text style={styles.btnText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: colors.Red}]}
              onPress={onPressHide}>
              <Text style={styles.btnText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: WP('10'),
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: WP('15'),
    paddingTop: WP('10'),
  },
  header: {
    fontSize: WP('5'),
    color: colors.input_Black,
    fontWeight: '700',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: WP('5'),
    paddingVertical: WP('3'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: WP('4'),
    color: colors.white,
  },
});
