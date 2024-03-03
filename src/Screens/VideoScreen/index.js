import React from 'react';
import {View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import MyStatusBar from '../../Components/Header/statusBar';
import colors from '../../Theme/Colors';
import {POST_IMAGE_URL} from '../../Theme/routes';
import styles from './style';

const index = props => {
  console.log(POST_IMAGE_URL + props.route.params.videoUrl);
  return (
    <>
      <MyStatusBar backgroundColor={colors.black} barStyle="light-content" />
      <View style={[styles.modalContainer]}>
        <View style={[styles.imageBg]}>
          <VideoPlayer
            navigator={props?.navigator}
            onBack={() => {
              props.navigation.goBack();
            }}
            source={{uri: POST_IMAGE_URL + props.route.params.videoUrl}}
          />
        </View>
      </View>
    </>
  );
};

export default index;
