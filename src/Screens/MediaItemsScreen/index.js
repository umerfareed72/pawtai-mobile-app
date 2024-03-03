import React from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import VideoCard from '../../Components/Dashboard/VideoCard';
import Header from '../../Components/Header/Header';
import MyStatusBar from '../../Components/Header/statusBar';
import colors from '../../Theme/Colors';
import {ExtensionValidator} from '../../Theme/Helper/ExtensionValidator';
import Images from '../../Theme/Images';
import {POST_IMAGE_URL} from '../../Theme/routes';
import style from './style';
import FastImage from 'react-native-fast-image';

const index = props => {
  //Select Current Video
  const currentVideo = item => {
    props.navigation.navigate('VideoScreen', {
      videoUrl: item.file_path,
    });
  };
  //Show Media Cards
  const showMediaCards = item => {
    const type = ExtensionValidator(item);
    return (
      <View style={[style.modalContainer]}>
        <View style={[style.imageBg]}>
          {type === 'image' ? (
            <FastImage
              source={{
                uri: POST_IMAGE_URL + item.file_path,
                priority: FastImage.priority.normal,
              }}
              style={style.imageStyling}
            />
          ) : (
            <View style={style.Align}>
              <VideoCard
                item={POST_IMAGE_URL + item.file_path}
                Height={'100%'}
                Width={'100%'}
              />
              {type === 'video' && (
                <TouchableOpacity
                  onPress={() => {
                    currentVideo(item);
                  }}
                  style={style.BtnStyling}>
                  <Image source={Images.play} style={style.icon80} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      <View style={style.Container}>
        <Header backButton={true} navigation={props.navigation} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={props?.route?.params?.items}
          renderItem={({item}) => showMediaCards(item)}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default index;
