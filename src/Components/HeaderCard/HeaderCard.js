import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
import Hyperlink from 'react-native-hyperlink';

const HeaderCard = ({
  date,
  title,
  mention,
  likeCount,
  username,
  isSlash,
  ispadding,
  onPressLikes,
  onPress,
  profileImage,
  firstLetter,
  iswith,
}) => {
  return (
    <>
      <View style={styles.container}>
        {/* Left Container */}

        <View style={[styles.lefContainer, {width: ispadding ? '20%' : '18%'}]}>
          {profileImage != null ? (
            <Image
              style={styles.ImageStyle}
              source={{uri: profileImage}}></Image>
          ) : (
            <View style={styles.mainContainer}>
              <Text style={styles.headingContainer}>
                {firstLetter != null ? firstLetter.toLocaleUpperCase() : 'U'}
              </Text>
            </View>
          )}
        </View>

        {/* Right Container */}

        <View style={styles.rightContainer}>
          <View
            style={{
              paddingLeft: 5,
              width: ispadding
                ? Dimensions.get('screen').width / 1.5
                : Dimensions.get('screen').width / 1.4,
            }}>
            <Hyperlink linkDefault={true} linkStyle={{color: colors.white}}>
              <Text style={styles.h1}>
                {title!=undefined ?title:'...'} {iswith}
                <Text style={[styles.h1, {color: colors.themeColor}]}>
                  {' '}
                  {mention}
                </Text>
              </Text>
            </Hyperlink>
          </View>
          {/* DisplayPost Info*/}

          <Text style={styles.h3}>
            {date} {isSlash} {username}
          </Text>
          <TouchableOpacity onPress={onPressLikes}>

          <Text style={[styles.h1,{paddingLeft:5}]}>{likeCount}{likeCount<=1 && likeCount>=0 ?' Like':' Likes'} </Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  container: {
    
    padding: WP('2'),
    flexDirection: 'row',
    backgroundColor: colors.themeColor,
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lefContainer: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  rightContainer: {
    paddingVertical: 10,
  },
  mainContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    fontSize: WP('6'),
    color: colors.themeColor,
  },
  ImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: colors.input_Black,
  },
  h1: {
    fontSize: WP('4'),
    color: colors.white,
  },
  h3: {
    fontSize: 12,
    color: colors.white,
    marginTop: WP('1'),
    paddingLeft: 5,
    opacity: 0.6,
  },
  ImageContainer: {
    marginTop: WP('1'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginRight: 10,
  },
  iconText: {
    color: colors.themeColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  DateStyle: {
    backgroundColor: colors.inactive_nav_color,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 2,
  },
  DateConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  PostDate: {
    color: colors.white,
    fontSize: 12,
  },
});
