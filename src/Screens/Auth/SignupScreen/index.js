/* eslint-disable no-alert */
import React, { useState, Fragment, useEffect } from "react";
import { View, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Content, Container } from "native-base";
import { useTranslation } from "../../../LanguageContext";
import { Images, Colors } from "../../../Theme";
import { InputField, ButtonComponent } from "../../../Components";
import {
  Wrapper,
  LogoImage,
  Titlelabel,
  OrWrapper,
  ErrorView,
  ErrorText,
} from "./style";
import Header from "../../../Components/Header/Header";
import MyStatusBar from "../../../Components/Header/statusBar";
import colors from "../../../Theme/Colors";
import * as yup from "yup";
import { Formik } from "formik";
import { userEmailSignup } from "../../../Redux/actions/auth.action";
import Indicator from "../../../Components/Loader/Indicator";
import { save_device_token } from "../../../Redux/actions/notification.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";
import { checkConnected } from "../../../Theme/Helper/ConnectivityHelper";
const SignupScreen = (props) => {
  const Language = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //Send Sign Up Request
  const signupHandler = async (values) => {
    const check = await checkConnected();
    if (check) {
      const user = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      dispatch(
        userEmailSignup(user, () => {
          AsyncStorage.getItem("fcmToken").then((token) => {
            dispatch(save_device_token(token));
          });
          Toast.show("User Registered Successfully", {
            position: Toast.position.TOP,
          });
          props.navigation.replace("AddPawtai", { show: false });
        })
      );
    } else {
      props.navigation.replace("ConnectivityScreen");
    }
  };
  //Move to Login
  const login = () => {
    props.navigation.navigate("LoginScreen");
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

          <Container style={{ backgroundColor: Colors.themeColor }}>
            <Content>
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={(values) => {
                  signupHandler(values);
                }}
                validationSchema={yup.object().shape({
                  username: yup.string().required("Username is Required"),
                  email: yup
                    .string()
                    .email("Email is not Valid")
                    .required("Email is Required"),
                  password: yup
                    .string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is Required"),
                })}
              >
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
                      <LogoImage source={Images.Logo} />
                      {/* <Welcomelabel>{Language.SignupTextWelcome}</Welcomelabel> */}
                      <Titlelabel>{Language.SignupTextPleaseSignup}</Titlelabel>
                      <View style={{ flex: 1 }}>
                        {/* Username field */}
                        <InputField
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={() => setFieldTouched("username")}
                          blurOnSubmit={false}
                          disableFullscreenUI={true}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          secureTextEntry={false}
                          placeholder={Language.SignupInputPlaceholderUsername}
                          icon={Images.USERNAME}
                          returnKeyType="done"
                          onSubmitEditing={Keyboard.dismiss}
                        />
                        {touched.username && errors.username && (
                          <ErrorView>
                            <ErrorText>{errors.username}</ErrorText>
                          </ErrorView>
                        )}
                        {/* Email field */}

                        <InputField
                          keyboardType="email-address"
                          disableFullscreenUI={true}
                          autoCapitalize="none"
                          secureTextEntry={false}
                          placeholder={Language.SignupInputPlaceholderEmail}
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={() => setFieldTouched("email")}
                          blurOnSubmit={false}
                          icon={Images.Email}
                          onSubmitEditing={Keyboard.dismiss}
                          returnKeyType="done"
                        />
                        {touched.email && errors.email && (
                          <ErrorView>
                            <ErrorText>{errors.email}</ErrorText>
                          </ErrorView>
                        )}
                        {/* Password field */}
                        <InputField
                          placeholder={Language.SignupInputPlaceholderPassword}
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={() => setFieldTouched("password")}
                          blurOnSubmit={false}
                          icon={Images.PASSWORD}
                          keyboardType="default"
                          disableFullscreenUI={true}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          onSubmitEditing={handleSubmit}
                          returnKeyType="done"
                        />
                        {touched.password && errors.password && (
                          <ErrorView>
                            <ErrorText>{errors.password}</ErrorText>
                          </ErrorView>
                        )}

                        <View style={{ marginTop: 10 }}>
                          {/* Login Button */}
                          <ButtonComponent
                            buttonText={Language.SignupButtonSignup}
                            buttonOnPress={handleSubmit}
                            color={Colors.themeGrey}
                          />
                        </View>
                      </View>

                      <OrWrapper>or</OrWrapper>

                      {/* Signup field */}
                      <ButtonComponent
                        buttonText={Language.SignupButtonLogin}
                        buttonOnPress={login}
                        color={colors.white}
                        textcolor={colors.themeColor}
                      />
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

export default SignupScreen;
