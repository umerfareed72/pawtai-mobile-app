import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import colors from '../../Theme/Colors';
import {timeChecker} from '../../Theme/Helper/TimeHelper';
import images from '../../Theme/Images';
import {WP} from '../../Theme/responsive';
import ItemCards from './ItemCards';
import {Root} from 'native-base';
import {userNameRegEx} from '../../Theme/routes';
import ParsedText from 'react-native-parsed-text';
import FastImage from 'react-native-fast-image';

const Card = ({
  date,
  title,
  mention,
  showReplyLikeButton,
  likeCount,
  commentCount,
  onPressComment,
  iswith,
  username,
  isSlash,
  ispadding,
  onPressLikes,
  renderImages,
  items,
  onPress,
  onPlayVideo,
  isLiked,
  profileImage,
  firstLetter,
  createdDate,
  previousDate,
  index,
  onLongPress,
  onPressCard,
  is_read,
  disableLike,
  disableCardPress,
  isCommented,
  end_Date,
}) => {
  //Match Old Value of created Post
  const matchOldValue = () => {
    let dateToShow = timeChecker(createdDate);
    let previousDateVal = timeChecker(previousDate);
    if (previousDateVal != dateToShow || index === 0) {
      return true;
    }
    return false;
  };
  const handleURL = url => {
    Linking.openURL(url);
  };

  return (
    <>
      {/* For Showing Post Date */}
      <View
        style={{
          ...styles.DateConatiner,
          ...{display: matchOldValue() ? 'flex' : 'none'},
        }}>
        <View style={styles.DateStyle}>
          <Text style={styles.PostDate}>{timeChecker(createdDate)}</Text>
        </View>
      </View>
      <Root>
        <TouchableOpacity
          disabled={disableCardPress}
          onPress={onPressCard}
          style={[
            styles.container,
            {backgroundColor: !is_read ? colors.white : colors.light_green},
          ]}
          onLongPress={onLongPress}>
          {/* Left Container */}

          <View
            style={[styles.lefContainer, {width: ispadding ? '20%' : '18%'}]}>
            {profileImage != null ? (
              <FastImage
                style={styles.ImageStyle}
                source={{uri: profileImage, priority: FastImage.priority.high}}
              />
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
              <ParsedText
                parse={[
                  {
                    pattern: userNameRegEx,
                    style: styles.username,
                  },
                  {type: 'url', style: styles.username, onPress: handleURL},
                ]}
                childrenProps={{allowFontScaling: false}}>
                {title}
              </ParsedText>
            </View>

            {/* Display Images & Videos*/}

            {renderImages && (
              <ItemCards
                items={items}
                onPress={onPress}
                onPlayVideo={onPlayVideo}
              />
            )}

            {/* DisplayPost Info*/}

            <Text style={styles.h3}>
              {date} {isSlash} {username}
            </Text>
            {end_Date && <Text style={styles.h3}>{end_Date}</Text>}
            {/* Display Like & Comment button */}

            {showReplyLikeButton ? (
              <>
                <View style={styles.ImageContainer}>
                  <TouchableOpacity
                    style={styles.ButtonContainer}
                    disabled={disableLike}
                    onPress={onPressLikes}>
                    <FastImage
                      source={images.like}
                      style={[
                        styles.iconStyle,
                        {
                          tintColor: isLiked,
                        },
                      ]}
                    />
                    <Text style={[styles.iconText, {color: isLiked}]}>
                      {likeCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPressComment}
                    style={[
                      styles.ButtonContainer,
                      {paddingHorizontal: WP('5')},
                    ]}>
                    <FastImage
                      source={images.comment}
                      style={[
                        styles.iconStyle,
                        {
                          tintColor: isCommented,
                        },
                      ]}
                    />
                    <Text style={[styles.iconText, {color: isCommented}]}>
                      {commentCount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              false
            )}
          </View>
        </TouchableOpacity>
      </Root>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    backgroundColor: colors.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    fontSize: WP('6'),
    color: colors.white,
  },
  ImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: colors.input_Black,
  },

  h3: {
    fontSize: 12,
    color: colors.light_Black,
    marginTop: WP('1'),
    paddingLeft: 5,
    opacity: 0.5,
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
  username: {
    color: colors.themeColor,
    fontWeight: 'bold',
  },

  mentionText: {
    fontSize: WP('4'),
    color: colors.light_Black,
  },
});
