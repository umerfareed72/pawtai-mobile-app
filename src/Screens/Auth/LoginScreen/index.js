/* eslint-disable no-alert */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from '../../../LanguageContext';
import {Images, Colors} from '../../../Theme';
import {InputField, ButtonComponent} from '../../../Components';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  Wrapper,
  LogoImage,
  Loginlabel,
  ForgetPasswordWrapper,
  OrWrapper,
  ErrorView,
  ErrorText,
} from './style';
import MyStatusBar from '../../../Components/Header/statusBar';
import {Container, Content} from 'native-base';
import colors from '../../../Theme/Colors';
import {userEmailLogin} from '../../../Redux/actions/auth.action';
import Indicator from '../../../Components/Loader/Indicator';
import {save_device_token} from '../../../Redux/actions/notification.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestPermission} from '../../../Theme/Helper/NotificationHandler';
import Toast from 'react-native-tiny-toast';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';

const LoginScreen = props => {
  const Language = useTranslation();
  //Redux Functions
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // Send Login Request
  const loginHandler = async values => {
    const check = await checkConnected();
    if (check) {
      const user = {
        username: values.email,
        password: values.password,
      };
      dispatch(
        userEmailLogin(user, () => {
          AsyncStorage.getItem('fcmToken').then(token => {
            if (requestPermission() != null) {
              dispatch(save_device_token(token));
              Toast.show('User Login Successfully', {
                position: Toast.position.TOP,
              });
              props.navigation.replace('HomeScreen');
            }
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
        <Container style={{backgroundColor: Colors.themeColor}}>
          <Content>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={values => {
                loginHandler(values);
              }}
              validationSchema={yup.object().shape({
                email: yup.string().required('Username is Required'),
                password: yup
                  .string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is Required'),
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
                <Wrapper>
                  <LogoImage source={Images.Logo} />
                  {/* <Welcomelabel>{Language.LoginTextWelcomeBack}</Welcomelabel> */}
                  <Loginlabel>{Language.LoginTextPleaseLogin}</Loginlabel>

                  {/* Login field */}
                  <InputField
                    keyboardType={'email-address'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    secureTextEntry={false}
                    placeholder={Language.LoginInputPlaceholderEmail}
                    icon={Images.USERNAME}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {touched.email && errors.email && (
                    <ErrorView>
                      <ErrorText>{errors.email}</ErrorText>
                    </ErrorView>
                  )}
                  {/* Password field */}
                  <InputField
                    value={values.password}
                    placeholder={Language.LoginInputPlaceholderPassword}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    icon={Images.PASSWORD}
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                  />
                  {touched.password && errors.password && (
                    <ErrorView>
                      <ErrorText>{errors.password}</ErrorText>
                    </ErrorView>
                  )}
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgetPassword')}>
                    <ForgetPasswordWrapper>
                      {Language.LoginTextForgetPassword}
                    </ForgetPasswordWrapper>
                  </TouchableOpacity>

                  {/* Login Button */}

                  <ButtonComponent
                    buttonText={Language.LoginButtonLogin}
                    buttonOnPress={handleSubmit}
                    color={Colors.themeGrey}
                  />

                  <OrWrapper>or</OrWrapper>

                  {/* Signup field */}

                  <ButtonComponent
                    color={colors.white}
                    textcolor={colors.themeColor}
                    buttonText={Language.LoginButtonSignup}
                    buttonOnPress={() =>
                      props.navigation.navigate('SignupScreen')
                    }
                  />
                </Wrapper>
              )}
            </Formik>
          </Content>
        </Container>
      )}
    </>
  );
};

export default LoginScreen;
