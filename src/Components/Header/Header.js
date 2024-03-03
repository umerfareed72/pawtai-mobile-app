import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../Theme';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';

const Header = ({
  title,
  backButton,
  navigation,
  text,
  btnText,
  btnImage,
  onPress,
  onPressBtn,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.contentContainer}>
          {backButton ? (
            <TouchableOpacity
              style={styles.headerContainer}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={Images.backBtn} style={styles.imageStyle} />
            </TouchableOpacity>
          ) : (
            false
          )}
          <Text style={styles.header}>{title}</Text>
        </View>
        {btnText ? (
          <TouchableOpacity onPress={onPressBtn} hitSlop={styles.hitSlope}>
            <Text style={styles.heading2}>{text}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true}>
            <Text style={styles.disable}>{text}</Text>
          </TouchableOpacity>
        )}
        {btnImage ? (
          <TouchableOpacity onPress={onPress} hitSlop={styles.hitSlope}>
            <Image style={styles.headerImage} source={Images.setting} />
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: WP('17'),
    backgroundColor: colors.themeColor,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('5'),
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    paddingRight: 10,
    paddingTop: 5,
  },
  header: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    color: colors.white,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  heading2: {
    fontSize: 16,
    color: colors.white,
  },
  headerImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  hitSlope: {
    top: 30,
    left: 30,
    right: 30,
  },
  disable: {
    opacity: 0.5,
    fontSize: 16,
    color: colors.white,
  },
});
