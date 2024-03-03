import React, {useState, Fragment} from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
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
const VerifyScreen = props => {
  const Language = useTranslation();
  const auth = useSelector(state => state.auth);
  const verifyCode = values => {
    if (values.code == auth.reset_data.code) {
      props.navigation.replace('ResetScreen');
    } else {
      Alert.alert(
        'Error',
        'Invalid Code',
        [{text: 'Ok', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
    }
  };
  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      <Header navigation={props.navigation} backButton={true} />
      <Container style={{backgroundColor: colors.themeColor}}>
        <Content>
          <Formik
            initialValues={{code: ''}}
            onSubmit={values => {
              verifyCode(values);
            }}
            validationSchema={yup.object().shape({
              code: yup.string().required('Verification Code is Required'),
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
                    <Title>{Language.CodeTextTitle}</Title>
                    <Welcomelabel>{Language.CodeTextBody}</Welcomelabel>
                    <View style={{marginVertical: 30}}>
                      <InputField
                        keyboardType="number-pad"
                        value={values.code}
                        placeholder={Language.CodePlaceholder}
                        onChangeText={handleChange('code')}
                        onBlur={() => setFieldTouched('code')}
                        blurOnSubmit={false}
                        disableFullscreenUI={true}
                        autoCapitalize="none"
                        icon={Images.PASSWORD}
                        secureTextEntry={true}
                        onSubmitEditing={handleSubmit}
                        returnKeyType="done"
                      />
                      {touched.code && errors.code && (
                        <ErrorView>
                          <ErrorText>{errors.code}</ErrorText>
                        </ErrorView>
                      )}
                    </View>

                    {/* Login Button */}
                    <ButtonComponent
                      buttonText={Language.CodeButtonSendButton}
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
  );
};

export default VerifyScreen;
