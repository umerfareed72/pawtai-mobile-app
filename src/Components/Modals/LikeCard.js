import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Colors, Images} from '../../Theme';
import images from '../../Theme/Images';
import {WP} from '../../Theme/responsive';

const LikeCard = ({
  username,
  firstLetter,
  isbold,
  isBtn,
  onPress,
  pawtai,
  isImage,
  userImage,
}) => {
  return (
    <>
      <View style={styles.container}>
        {isImage != null ? (
          <Image source={{uri: userImage}} style={styles.usrImage} />
        ) : (
          <View style={styles.mainContainer}>
            <Text style={styles.headingContainer}>
              {firstLetter != null ? firstLetter.toLocaleUpperCase() : 'U'}
            </Text>
          </View>
        )}

        <View style={{width: '80%'}}>
          <Text
            style={[styles.heading, {fontWeight: isbold ? 'bold' : 'normal'}]}>
            {username != null ? username : 'Username'}
          </Text>
          {isBtn && (
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.touchConatiner} onPress={onPress}>
                <Image source={images.paw} style={styles.icon10} />
                <Text style={styles.smallText}>
                  {pawtai != null ? pawtai : 'Pick Pawtai'}
                </Text>

                <Image source={images.downArrow} style={styles.icon10} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default LikeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 5,
  },
  headingContainer: {
    fontSize: WP('6'),
    color: Colors.white,
  },
  heading: {
    fontSize: WP('4'),
    color: Colors.light_Black,
  },
  icon10: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  smallText: {
    fontSize: 12,
    color: Colors.light_Black,
    marginHorizontal: 5,
  },
  touchConatiner: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.light_Black,
    paddingVertical: 2,

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    alignItems: 'center',
  },
  usrImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
