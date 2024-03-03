import React, {useState, Fragment} from 'react';
import {View, Keyboard} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  resetPassword,
  userEmailLogin,
} from '../../../Redux/actions/auth.action';
import Indicator from '../../../Components/Loader/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {save_device_token} from '../../../Redux/actions/notification.action';
import Toast from 'react-native-tiny-toast';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
const ResetPassword = props => {
  const Language = useTranslation();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const resetPassHandler = async values => {
    const check = await checkConnected();
    if (check) {
      const value = {
        username: auth.reset_data.username,
        password: values.password,
      };
      dispatch(
        resetPassword(value, () => {
          dispatch(
            userEmailLogin(value, () => {
              AsyncStorage.getItem('fcmToken').then(token => {
                dispatch(save_device_token(token));
              });
              Toast.show('Password Reset Successfully', {
                position: Toast.position.TOP,
              });
              props.navigation.replace('HomeScreen');
            }),
          );
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
      {!auth?.loading ? (
        <>
          <Header navigation={props.navigation} />
          <Container style={{backgroundColor: colors.themeColor}}>
            <Content>
              <Formik
                initialValues={{password: '', cPassword: ''}}
                onSubmit={values => {
                  resetPassHandler(values);
                }}
                validationSchema={yup.object().shape({
                  password: yup
                    .string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('New Password is Required'),
                  cPassword: yup
                    .string()
                    .oneOf([yup.ref('password'), null], 'Passwords must match')
                    .min(6, 'Password must be at least 6 characters')
                    .required('New Password is Required'),
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
                        <Title>
                          {Language.ResetPasswordTextForgetYourPassword}
                        </Title>
                        <Welcomelabel>
                          {Language.ResetPasswordTextResetHere}
                        </Welcomelabel>
                        <View style={{marginVertical: 30}}>
                          <InputField
                            value={values.password}
                            placeholder={
                              Language.ResetPasswordTextForgetYourPassword
                            }
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            blurOnSubmit={false}
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            icon={Images.PASSWORD}
                            onSubmitEditing={Keyboard.dismiss}
                            secureTextEntry={true}
                            returnKeyType="done"
                          />
                          {touched.password && errors.password && (
                            <ErrorView>
                              <ErrorText>{errors.password}</ErrorText>
                            </ErrorView>
                          )}

                          <InputField
                            value={values.cPassword}
                            placeholder={
                              Language.ResetConfirmPasswordTextPassword
                            }
                            onChangeText={handleChange('cPassword')}
                            onBlur={() => setFieldTouched('cPassword')}
                            blurOnSubmit={false}
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            icon={Images.PASSWORD}
                            secureTextEntry={true}
                            onSubmitEditing={handleSubmit}
                            returnKeyType="done"
                          />
                          {touched.cPassword && errors.cPassword && (
                            <ErrorView>
                              <ErrorText>{errors.cPassword}</ErrorText>
                            </ErrorView>
                          )}
                        </View>

                        {/* Login Button */}
                        <ButtonComponent
                          buttonText={Language.ResetPasswordButtonSendButton}
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
      ) : (
        <Indicator />
      )}
    </>
  );
};

export default ResetPassword;
