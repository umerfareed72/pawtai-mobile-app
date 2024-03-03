import React, {useState, Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../LanguageContext';
import {Images, Colors} from '../../../Theme';
import {InputField, ButtonComponent} from '../../../Components';

import {
  Wrapper,
  MainWrapper,
  Welcomelabel,
  Title,
  OrWrapper,
  ErrorView,
  ErrorText,
} from './style';
import MyStatusBar from '../../../Components/Header/statusBar';
import {Container, Content} from 'native-base';
import Header from '../../../Components/Header/Header';
import colors from '../../../Theme/Colors';
import {find_Pawtai, join_Pawtai} from '../../../Redux/actions/pawtai.action';
import Indicator from '../../../Components/Loader/Indicator';
import * as yup from 'yup';
import {Formik} from 'formik';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
const JoinPawtai = props => {
  const Language = useTranslation();
  const dispatch = useDispatch();
  const pawtai = useSelector(state => state.pawtai);

  //Join Patai Request Handler

  const joinApiHanlder = async values => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        pid: values.petCode,
      };
      if (props?.route?.params.show) {
        dispatch(
          find_Pawtai(requestBody, () => {
            props.navigation.navigate('VerifyPawtai', {
              showOnBoarding: true,
            });
          }),
        );
      } else {
        dispatch(
          find_Pawtai(requestBody, () => {
            props.navigation.navigate('VerifyPawtai');
          }),
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
          <Header navigation={props.navigation} backButton={true} />
          <Container style={{backgroundColor: colors.themeColor}}>
            <Content>
              <Wrapper>
                <Formik
                  initialValues={{petCode: ''}}
                  onSubmit={values => {
                    joinApiHanlder(values);
                  }}
                  validationSchema={yup.object().shape({
                    petCode: yup.string().required('Pet Code is Required'),
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
                        <Title>{Language.JoinPawtaiTextTitle}</Title>
                        <Welcomelabel>
                          {Language.JoinPawtaiTextDescription}
                        </Welcomelabel>

                        {/* Pet Code Field */}

                        <View style={{marginVertical: 25}}>
                          <InputField
                            placeholder={Language.JoinPawtaiInputPetNameLabel}
                            value={values.petCode}
                            onChangeText={handleChange('petCode')}
                            onBlur={() => setFieldTouched('petCode')}
                            blurOnSubmit={false}
                            icon={Images.PawtaiPaws}
                            iconStyle={{width: 20, height: 15}}
                            keyboardType="email-address"
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            secureTextEntry={false}
                          />
                          {touched.petCode && errors.petCode && (
                            <ErrorView>
                              <ErrorText>{errors.petCode}</ErrorText>
                            </ErrorView>
                          )}
                        </View>

                        {/* Get Started Button */}
                        <ButtonComponent
                          buttonText={Language.JoinPawtaiButtonGetStarted}
                          color={Colors.themeGrey}
                          buttonOnPress={handleSubmit}
                        />

                        <OrWrapper>or</OrWrapper>

                        {/* Join a Pawtai Button */}
                        <ButtonComponent
                          color={colors.white}
                          textcolor={colors.themeColor}
                          buttonText={Language.JoinPawtaiButtonAddPawtai}
                          buttonOnPress={() => {
                            if (props?.route?.params.show) {
                              props.navigation.navigate('AddPawtai', {
                                show: true,
                              });
                            } else {
                              props.navigation.navigate('AddPawtai');
                            }
                          }}
                        />
                      </MainWrapper>
                    </Fragment>
                  )}
                </Formik>
              </Wrapper>
            </Content>
          </Container>
        </>
      )}
    </>
  );
};

export default JoinPawtai;
