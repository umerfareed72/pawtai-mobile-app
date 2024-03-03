import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../../Theme/Colors';
import images from '../../Theme/Images';
import {WP} from '../../Theme/responsive';
import VideoCard from './VideoCard';
import {POST_IMAGE_URL} from '../../Theme/routes';
import {ExtensionValidator} from '../../Theme/Helper/ExtensionValidator';
import FastImage from 'react-native-fast-image';

const ItemCards = ({onPress, items, onPlayVideo}) => {
  const currentVideo = item => {
    if (onPlayVideo) {
      const backResponse = {
        uri: item,
      };
      onPlayVideo(backResponse);
    }
  };
  return (
    <>
      <View style={styles.imageWrapper}>
        {items?.map((item, index) => {
          const type = ExtensionValidator(item);

          return (
            <View key={index} style={{padding: 5}}>
              <TouchableOpacity onPress={onPress}>
                <View
                  key={(item, index) => index.toString()}
                  style={[
                    styles.imageLayout,
                    {
                      height:
                        items.length > 3
                          ? Dimensions.get('screen').height / 7.8
                          : Dimensions.get('screen').height / 4.5,
                      width:
                        items.length > 3
                          ? Dimensions.get('screen').width / 2.95
                          : Dimensions.get('window').width / 1.4,
                      display: index >= 4 ? 'none' : 'flex',
                    },
                  ]}>
                  {type === 'image' && (
                    <>
                      <FastImage
                        source={{
                          uri: POST_IMAGE_URL + item.file_path,
                          priority: FastImage.priority.high,
                        }}
                        style={styles.ImageStyling}
                      />
                    </>
                  )}
                  {type === 'video' && (
                    <VideoCard
                      index={index}
                      item={POST_IMAGE_URL + item.file_path}
                      Radius={5}
                      Height={
                        items.length > 3
                          ? Dimensions.get('screen').height / 7.8
                          : Dimensions.get('screen').height / 4.5
                      }
                      Width={
                        items.length > 3
                          ? Dimensions.get('screen').width / 2.95
                          : Dimensions.get('window').width / 1.4
                      }
                    />
                  )}
                  {items.length > 4 && index === 3 && (
                    <>
                      <View style={styles.bgOverlay}></View>
                      <View
                        style={{
                          position: 'absolute',
                        }}>
                        <Text style={styles.textStyle}>
                          +{items.length - 4}
                        </Text>
                      </View>
                    </>
                  )}
                  {index !== 3 && type === 'video' && (
                    <TouchableOpacity
                      hitSlop={styles.hitSlope}
                      onPress={() => {
                        currentVideo(item);
                      }}
                      style={{position: 'absolute'}}>
                      <Image source={images.play} style={styles.icon50} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default ItemCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  lefContainer: {
    paddingVertical: 5,
    width: '18%',
  },
  rightContainer: {
    paddingVertical: 10,
    width: '82%',
  },
  ImageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  h1: {
    fontSize: WP('4'),
    color: colors.light_Black,
  },
  h3: {
    fontSize: WP('3'),
    color: colors.light_Black,
    marginTop: WP('1'),
  },
  ImageContainer: {
    marginTop: WP('1'),
    flexDirection: 'row',
    alignItems: 'center',
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
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageLayout: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.input_Black,
  },
  bgOverlay: {
    backgroundColor: 'rgba(6,8,10,0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 5,
  },
  ImageStyling: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
  icon50: {
    height: 50,
    width: 50,

    resizeMode: 'contain',
  },
  hitSlope: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
});
