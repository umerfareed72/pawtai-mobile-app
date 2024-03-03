import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
import Video from 'react-native-video';

const VideoCard = ({item, Height, Width, Radius}) => {
  const videoPlayer = useRef();
  return (
    <>
      <Video
        ref={videoPlayer}
        resizeMode={'cover'}
        paused={true}
        muted={true}
        style={{
          height: Height,
          width: Width,
          borderRadius: Radius,
        }}
        rate={1.0}
        volume={1.0}
        playInBackground={false}
        playWhenInactive={false}
        source={{
          uri: item,
        }}
        onLoad={() => videoPlayer.current.seek(0)}></Video>
    </>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoStyle: {
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  h3: {
    fontSize: 12,
    color: colors.light_Black,
    marginTop: WP('1'),
  },
  imageLayout: {
    resizeMode: 'cover',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
