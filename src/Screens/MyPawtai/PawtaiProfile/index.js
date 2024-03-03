import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Share,
} from 'react-native';
import {Container} from 'native-base';
import colors from '../../../Theme/Colors';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import style from './style';
import images from '../../../Theme/Images';
import InfoCard from '../../../Components/MyPawtai/InfoCard';
import {ButtonComponent} from '../../../Components';
import {useSelector, useDispatch} from 'react-redux';
import {PROFILE_IMAGE_URL} from '../../../Theme/routes';
import ImagePickerModal from '../../../Components/Modals/ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {edit_Pawtai_profile} from '../../../Redux/actions/pawtai.action';
import Loader from '../../../Components/Loader/Loader';
import FastImage from 'react-native-fast-image';

//Image Options
let options = {
  mediaType: 'photo',
};

const PawtaiProfile = ({navigation}) => {
  //Declaration
  const pawtai = useSelector(state => state.pawtai);
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();
  //Send Text
  const sendText = async code => {
    try {
      const result = await Share.share({
        title: 'Pawtai',
        message:
          Platform.OS == 'android'
            ? `Your Pawtai Joining Code is ${code}, Link to Download Application from PlayStore https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`
            : `Your Pawtai Joining Code is ${code}, Link to Download Application from AppStore https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //Open Gallery
  const showGallery = () => {
    ImagePicker.openPicker(options)
      .then(images => {
        console.log(images);
        setShow(false);
        const requestBody = {
          p_id: pawtai?.profile_Data?.id,
          image: {
            uri: images?.path,
            type: images?.mime,
            name: 'image/jpeg',
          },
        };
        dispatch(
          edit_Pawtai_profile(requestBody, () => {
            setProfilePic(images);
          }),
        );
      })
      .catch(error => {
        setShow(false);
        console.log('User cancelled image picker');
        console.log(error);
      });
  };
  //Open Camera
  const showCamera = () => {
    ImagePicker.openCamera(options)
      .then(images => {
        setShow(false);
        const requestBody = {
          p_id: pawtai?.profile_Data?.id,
          image: {
            uri: images?.path,
            type: images?.mime,
            name: 'image/jpeg',
          },
        };
        dispatch(
          edit_Pawtai_profile(requestBody, () => {
            setProfilePic(images);
          }),
        );
      })
      .catch(error => {
        setShow(false);
        console.log('User cancelled image picker');
        console.log(error);
      });
  };

  return (
    <Container>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      <Header navigation={navigation} backButton={true} title={'My Pawtai'} />
      <ScrollView>
        <View style={style.contentContainer}>
          {/* Pawtai Profile Image */}

          <View style={style.mainImageContainer}>
            <View style={style.imageContainer}>
              {!pawtai?.loading ? (
                <>
                  <FastImage
                    source={{
                      uri:
                        profilePic != ''
                          ? profilePic?.path
                          : PROFILE_IMAGE_URL + pawtai?.profile_Data?.image,
                      priority: FastImage.priority.high,
                    }}
                    style={style.imageStyle}
                  />
                  {pawtai?.profile_Data?.is_owner == 1 && (
                    <TouchableOpacity
                      style={style.btnContainer}
                      onPress={() => setShow(true)}>
                      <Image source={images.gallery} style={style.icon15} />
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Loader loader_color={colors.white} />
              )}
            </View>
          </View>
          {/* Text Cards */}
          <View>
            <InfoCard
              title={'Pawtai Id'}
              text={pawtai?.profile_Data?.code}
              id={true}
            />

            <InfoCard title={'Name'} text={pawtai?.profile_Data?.name} />
            <View style={style.textMainContainer}>
              <View style={style.textContainer}>
                <InfoCard
                  title={'Pet Type'}
                  text={
                    pawtai?.profile_Data?.type != undefined
                      ? pawtai?.profile_Data?.type
                      : '-------'
                  }
                />
              </View>
              <View style={style.textContainer}>
                <InfoCard
                  title={'Pet Breed'}
                  text={
                    pawtai?.profile_Data?.breed != undefined
                      ? pawtai?.profile_Data?.breed
                      : '-------'
                  }
                />
              </View>
            </View>
            <View style={style.textMainContainer}>
              <View style={style.textContainer}>
                <InfoCard
                  title={'Pet Length'}
                  text={
                    pawtai?.profile_Data?.size != undefined
                      ? pawtai?.profile_Data?.size +
                        ' ' +
                        pawtai?.profile_Data?.length_unit
                      : '-------'
                  }
                />
              </View>
              <View style={style.textContainer}>
                <InfoCard
                  title={'Pet Weight'}
                  text={
                    pawtai?.profile_Data?.weight != undefined
                      ? pawtai?.profile_Data?.weight +
                        ' ' +
                        pawtai?.profile_Data?.weight_unit
                      : '-------'
                  }
                />
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={{padding: 25}}>
            {pawtai?.profile_Data?.is_owner == 1 && (
              <ButtonComponent
                buttonOnPress={() => navigation.navigate('EditProfile')}
                color={colors.themeColor}
                buttonText={'Edit Profile'}
                shadowColor={colors.shawdow_theme_color}
              />
            )}

            {/* Share Button */}

            <ButtonComponent
              buttonOnPress={() => sendText(pawtai?.profile_Data?.code)}
              isImage={true}
              color={colors.input_Black}
              buttonText={'Share This Pawtai'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Image Picker Modals */}

      {show && (
        <ImagePickerModal
          show={show}
          onPressHide={() => setShow(false)}
          onPressGallery={() => {
            showGallery();
          }}
          onPressCamera={() => {
            showCamera();
          }}
        />
      )}
    </Container>
  );
};

export default PawtaiProfile;
