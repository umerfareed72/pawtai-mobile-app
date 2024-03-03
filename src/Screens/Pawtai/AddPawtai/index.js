import React, {useState, Fragment} from 'react';
import {View, Alert, StyleSheet, Text, Keyboard} from 'react-native';
import {useTranslation} from '../../../LanguageContext';
import {Images, Colors} from '../../../Theme';
import {InputField, ButtonComponent} from '../../../Components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  Wrapper,
  MainWrapper,
  Welcomelabel,
  Title,
  OrWrapper,
  CameraImage,
  GalleryContainer,
  GalleryText,
  ProfileImage,
  ErrorView,
  ErrorText,
  FooterText,
} from './style';
import colors from '../../../Theme/Colors';
import {Container, Content} from 'native-base';
import MyStatusBar from '../../../Components/Header/statusBar';
import Header from '../../../Components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {add_Pawtai} from '../../../Redux/actions/pawtai.action';
import Indicator from '../../../Components/Loader/Indicator';
import ImagePickerModal from '../../../Components/Modals/ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';

const AddPawtai = props => {
  const [profilePicture, setProfilePicture] = useState('');
  const [show, setShow] = useState(false);
  const Language = useTranslation();
  const dispatch = useDispatch();
  const pawtai = useSelector(state => state.pawtai);
  //media type options
  let options = {
    mediaType: 'photo',
  };
  //open Gallery
  const showGallery = () => {
    ImagePicker.openPicker(options)
      .then(images => {
        console.log(images);
        setShow(false);
        setProfilePicture(images);
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
        setProfilePicture(images);
      })
      .catch(error => {
        setShow(false);
        console.log('User cancelled image picker');
        console.log(error);
      });
  };
  //Add Pawtai Request
  const addPawtai = async values => {
    const check = await checkConnected();
    if (check) {
      if (profilePicture != '') {
        console.log(profilePicture);
        const imageData = {
          uri: profilePicture.path,
          name: profilePicture.path.substring(
            profilePicture.path.lastIndexOf('/') + 1,
          ),
          type: profilePicture.mime,
        };
        const requestBody = {
          image: imageData,
          name: values.petName,
        };
        if (props?.route?.params?.show) {
          dispatch(
            add_Pawtai(requestBody, () => {
              props.navigation.navigate('MyPawtai');
            }),
          );
        } else {
          dispatch(
            add_Pawtai(requestBody, () => {
              props.navigation.replace('WelcomeScreen');
            }),
          );
        }
      } else {
        Alert.alert(
          'Error',
          'Profile Picture is Required',
          [{text: 'Ok', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      {pawtai.loading ? (
        <Indicator />
      ) : (
        <>
          <Header
            navigation={props.navigation}
            backButton={props?.route?.params?.show ? true : false}
          />
          <Container style={{backgroundColor: colors.themeColor}}>
            <Content>
              <Wrapper>
                <Formik
                  initialValues={{petName: ''}}
                  onSubmit={(values, formikActions) => {
                    addPawtai(values);
                  }}
                  validationSchema={yup.object().shape({
                    petName: yup.string().required('Pet Name is Required'),
                  })}>
                  {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                  }) => (
                    <Fragment>
                      <MainWrapper>
                        <Title>{Language.AddPawtaiTextAddAPawtai}</Title>
                        <Welcomelabel>
                          {Language.AddPawtaiTextNewPawtai}
                        </Welcomelabel>
                        {profilePicture ? (
                          <GalleryContainer onPress={() => setShow(true)}>
                            <ProfileImage source={{uri: profilePicture.path}} />
                          </GalleryContainer>
                        ) : (
                          <GalleryContainer onPress={() => setShow(true)}>
                            <CameraImage source={Images.pictures} />
                            <GalleryText>
                              {Language.AddPawtaiGalleryText1}
                            </GalleryText>
                            <GalleryText>
                              {Language.AddPawtaiGalleryText2}
                            </GalleryText>
                          </GalleryContainer>
                        )}
                        <View style={{marginVertical: 25}}>
                          <InputField
                            placeholder={Language.AddPawtaiInputPetName}
                            value={values.petName}
                            onChangeText={handleChange('petName')}
                            onBlur={() => setFieldTouched('petName')}
                            blurOnSubmit={false}
                            icon={Images.PawtaiPaws}
                            iconStyle={{width: 20, height: 15}}
                            keyboardType="email-address"
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            secureTextEntry={false}
                            onSubmitEditing={handleSubmit}
                            returnKeyType="done"
                          />
                          {touched.petName && errors.petName && (
                            <ErrorView>
                              <ErrorText>{errors.petName}</ErrorText>
                            </ErrorView>
                          )}
                        </View>

                        {/* Get Started Button */}
                        <ButtonComponent
                          buttonText={Language.AddPawtaiButtonGetStarted}
                          color={Colors.themeGrey}
                          buttonOnPress={handleSubmit}
                        />

                        <OrWrapper>or</OrWrapper>

                        {/* Join a Pawtai Button */}
                        <View style={{paddingBottom: 10}}>
                          <ButtonComponent
                            color={colors.white}
                            textcolor={colors.themeColor}
                            buttonText={Language.AddPawtaiButtonJoinPawtai}
                            buttonOnPress={() =>
                              props.navigation.navigate('JoinPawtai', {
                                show: props?.route?.params?.show ? true : false,
                              })
                            }
                          />
                        </View>

                        <FooterText>
                          Already have a code? Join an existing Pawtai.
                        </FooterText>
                      </MainWrapper>
                    </Fragment>
                  )}
                </Formik>
              </Wrapper>
            </Content>
          </Container>

          {/* Image Picker Modal */}

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
        </>
      )}
    </>
  );
};

export default AddPawtai;
