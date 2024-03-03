import React, {useState, Fragment, useEffect} from 'react';
import {KeyboardAvoidingView, View, StyleSheet, Text} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from '../../../LanguageContext';
import {Images, Colors} from '../../../Theme';
import {InputField, ButtonComponent} from '../../../Components';
import {
  Wrapper,
  MainWrapper,
  Welcomelabel,
  Title,
  ErrorView,
  ErrorText,
} from './style';
import {Container, Content} from 'native-base';
import MyStatusBar from '../../../Components/Header/statusBar';
import Header from '../../../Components/Header/Header';
import colors from '../../../Theme/Colors';
import * as yup from 'yup';
import {Formik} from 'formik';
import {forgotPassword} from '../../../Redux/actions/auth.action';
import Indicator from '../../../Components/Loader/Indicator';
import Toast from 'react-native-tiny-toast';
import { checkConnected } from '../../../Theme/Helper/ConnectivityHelper';

const ForgotPassword = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const Language = useTranslation();

  //////Send Email Request///////
  const sendEmail =async values => {
    const check = await checkConnected();
    if (check) {
  
    const data = {
      email: values.email,
    };
    dispatch(
      forgotPassword(data, () => {
        props.navigation.replace('VerifyScreen');
        Toast.show('Email Sent Successfully', {
          position: Toast.position.TOP,
        });
    
      }),
    );
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

      {auth.loading ? (
        <Indicator />
      ) : (
        <>
          <Header navigation={props.navigation} backButton={true} />
          <Container style={{backgroundColor: colors.themeColor}}>
            <Content>
              <Formik
                initialValues={{email: ''}}
                onSubmit={values => {
                  sendEmail(values);
                }}
                validationSchema={yup.object().shape({
                  email: yup
                    .string()
                    .email('Email is not Valid')
                    .required('Email is Required'),
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
                    <Wrapper>
                      <MainWrapper>
                        <Welcomelabel>
                          {Language.ForgetPasswordTextForgetYourPassword}
                        </Welcomelabel>
                        <Title>{Language.ForgetPasswordTextResetHere}</Title>

                        {/* Email Input Filed */}

                        <View style={{marginVertical: 30}}>
                          <InputField
                            placeholder={Language.ForgetPasswordTextEmail}
                            keyboardType={'email-address'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            blurOnSubmit={false}
                            icon={Images.Email}
                            iconStyle={{width: 20, height: 15}}
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            secureTextEntry={false}
                            onSubmitEditing={handleSubmit}
                            returnKeyType="done"
                          />
                          {touched.email && errors.email && (
                            <ErrorView>
                              <ErrorText>{errors.email}</ErrorText>
                            </ErrorView>
                          )}
                        </View>

                        {/* Login Button */}
                        <ButtonComponent
                          buttonText={
                            Language.ForgetPasswordButtonSendResetLink
                          }
                          buttonOnPress={handleSubmit}
                          color={Colors.themeGrey}
                        />
                      </MainWrapper>
                    </Wrapper>
                  </Fragment>
                )}
              </Formik>
            </Content>
          </Container>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
