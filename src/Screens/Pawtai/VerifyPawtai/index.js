import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {useTranslation} from '../../../LanguageContext';
import {Images, Colors, Constants} from '../../../Theme';
import {InputField, ButtonComponent} from '../../../Components';
import {
  Wrapper,
  MainWrapper,
  Welcomelabel,
  Title,
  GalleryContainer,
  ProfileImage,
} from './style';
import colors from '../../../Theme/Colors';
import {Container} from 'native-base';
import MyStatusBar from '../../../Components/Header/statusBar';
import Header from '../../../Components/Header/Header';
import {PROFILE_IMAGE_URL} from '../../../Theme/routes';
import {join_Pawtai} from '../../../Redux/actions/pawtai.action';
import Indicator from '../../../Components/Loader/Indicator';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
const VerifyPawtai = props => {
  const [profilePicture, setProfilePicture] = useState('');
  const Language = useTranslation();
  const pawtai = useSelector(state => state.pawtai);
  const dispatch = useDispatch();
  //Join pawati Request
  const joinClickHandler = async values => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        code: pawtai?.pawtai_data?.code,
      };
      if (props?.route?.params?.showOnBoarding) {
        dispatch(
          join_Pawtai(requestBody, () => {
            Alert.alert('Success', 'You Join Pawtai Successfully', [
              {
                text: 'OK',
                onPress: () => props?.navigation.navigate('MyPawtai'),
              },
            ]);
          }),
        );
      } else {
        dispatch(
          join_Pawtai(requestBody, () => {
            Alert.alert('Success', 'You Join Pawtai Successfully', [
              {
                text: 'OK',
                onPress: () => props.navigation.replace('WelcomeScreen'),
              },
            ]);
          }),
        );
      }
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  };
  return (
    <Container>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      {pawtai.loading ? (
        <Indicator />
      ) : (
        <>
          <Header backButton={true} navigation={props.navigation} />
          <Wrapper>
            <MainWrapper>
              <Title>{Language.VerifyPawtaiTextTitle}</Title>
              <Welcomelabel>
                {Language.VerifyPawtaiTextDescription}
              </Welcomelabel>

              <GalleryContainer>
                <ProfileImage
                  source={
                    profilePicture
                      ? {uri: profilePicture}
                      : {uri: PROFILE_IMAGE_URL + pawtai?.pawtai_data?.image}
                  }
                />
              </GalleryContainer>

              <View style={{marginVertical: 25}}>
                <Text style={{alignSelf: 'center', color: colors.white}}>
                  {pawtai?.pawtai_data?.name}
                </Text>
              </View>
              <View style={{marginBottom: 10}}>
                {/* Get Started Button */}
                <ButtonComponent
                  buttonText={Language.VerifyPawtaiButtonJoin}
                  color={Colors.themeGrey}
                  buttonOnPress={() => joinClickHandler()}
                />
              </View>
              {/* Join a Pawtai Button */}
              <ButtonComponent
                color={colors.white}
                textcolor={colors.themeColor}
                buttonText={Language.VerifyPawtaiButtonDontJoin}
                buttonOnPress={() => props.navigation.navigate('JoinPawtai')}
              />
            </MainWrapper>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default VerifyPawtai;
