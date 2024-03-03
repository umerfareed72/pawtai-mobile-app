import React, {useState, Fragment, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {Content, Container, Item} from 'native-base';
import colors from '../../../Theme/Colors';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import style from './style';
import EventText from '../../../Components/Events/EventText';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {pawtaiProfile} from '../../../Redux/actions/pawtai.action';
import Indicator from '../../../Components/Loader/Indicator';
import TextInputField from '../../../Components/TextInputFields/TextInputField';
import {responseValidator} from '../../../Redux/actions/helper';
import {post} from '../../../Services';
import {PAWTAI_CONST} from '../../../Theme/routes';
import {header} from '../../../Theme/Constants';
import Toast from 'react-native-tiny-toast';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
const EditProfile = ({navigation, route}) => {
  //Declarations
  const [inCM, setCM] = useState(true);
  const [inKG, setKG] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pawtai = useSelector(state => state.pawtai);

  //Get Input Fields Length Data
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      if (pawtai?.profile_Data?.length_unit != 'CM') {
        setCM(false);
      }
      if (pawtai?.profile_Data?.weight_unit != 'KG') {
        setKG(false);
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  }, []);
  //Send Edit Profile Request
  const editPawtai = async value => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        var form = new FormData();
        form.append('name', value?.name);
        form.append('type', value?.type);
        form.append('size', value?.length);
        form.append('breed', value?.breed);
        form.append('weight', value.weight);
        form.append('length', value.length);
        form.append('length_unit', inCM ? 'CM' : 'IN');
        form.append('weight_unit', inKG ? 'KG' : 'LB');
        const response = await post(
          `${PAWTAI_CONST}edit/${pawtai?.profile_Data?.id}`,
          form,
          await header(),
        );

        if (response) {
          setLoading(false);
          const responseVal = {...response?.data?.result, is_owner: true};
          dispatch(
            pawtaiProfile(responseVal, () => {
              Toast.show('Pawtai Profile Updated Successfully', {
                position: Toast.position.TOP,
              });
              navigation.navigate('PawtaiProfile');
            }),
          );
        }
      } catch (error) {
        setLoading(false);
        let status = JSON.stringify(error.message);
        let msg = error.response.data.message;
        responseValidator(status, msg);
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  return (
    <>
      <MyStatusBar
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />
      {!loading ? (
        <>
          <Header
            navigation={navigation}
            backButton={true}
            title={'Edit Profile'}
          />
          <Container>
            <Content>
              <Formik
                initialValues={{
                  name: pawtai?.profile_Data.name
                    ? pawtai?.profile_Data.name
                    : '',
                  type: pawtai?.profile_Data.type
                    ? pawtai?.profile_Data.type
                    : '',
                  length: pawtai?.profile_Data.size
                    ? pawtai?.profile_Data.size
                    : '',
                  weight: pawtai?.profile_Data.weight
                    ? pawtai?.profile_Data.weight
                    : '',
                  breed: pawtai?.profile_Data.breed
                    ? pawtai?.profile_Data.breed
                    : '',
                }}
                onSubmit={values => {
                  editPawtai(values);
                }}
                validationSchema={yup.object().shape({
                  name: yup.string(),
                  type: yup
                    .string()
                    .matches(
                      /^[aA-zZ\s]+$/,
                      'Only alphabets are allowed for this field ',
                    ),
                  length: yup.number().typeError('Must specify a number'),
                  weight: yup.number().typeError('Must specify a number'),
                  breed: yup
                    .string()
                    .matches(
                      /^[aA-zZ\s]+$/,
                      'Only alphabets are allowed for this field ',
                    ),
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
                    <View style={style.contentContainer}>
                      {/* Pet Name Field */}

                      <TextInputField
                        title={'Pet Name'}
                        value={values?.name}
                        placehodler={'Enter Name'}
                        placeholderTextColor={colors.input_Black}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        blurOnSubmit={false}
                        disableFullscreenUI={true}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        autoCapitalize="none"
                        touched={touched.name}
                        error={errors.name}
                      />

                      {/* Pet Type Field */}

                      <TextInputField
                        title={'Pet Type'}
                        value={values.type}
                        onChangeText={handleChange('type')}
                        onBlur={() => setFieldTouched('type')}
                        blurOnSubmit={false}
                        disableFullscreenUI={true}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        style={style.titleInput}
                        placehodler={'Enter Type'}
                        placeholderTextColor={colors.input_Black}
                        error={errors.type}
                        touched={touched.type}
                      />
                      {/* Pet Length Field */}

                      <View style={{paddingVertical: 5}}>
                        <EventText title={'Pet Length'} />
                        <View style={[style.inputContainer]}>
                          <TextInput
                            value={values.length}
                            onChangeText={handleChange('length')}
                            onBlur={() => setFieldTouched('length')}
                            blurOnSubmit={false}
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            returnKeyType="done"
                            keyboardType={'decimal-pad'}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            style={{width: '70%'}}
                            placeholder={'Enter Length'}
                            placeholderTextColor={
                              colors.input_Black
                            }></TextInput>
                          <TouchableOpacity
                            onPress={() => {
                              setCM(true);
                            }}
                            style={{paddingHorizontal: 20}}>
                            <Text
                              style={{
                                color: inCM
                                  ? colors.themeColor
                                  : colors.input_Black,
                                fontSize: 16,
                              }}>
                              CM
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              setCM(false);
                            }}>
                            <Text
                              style={{
                                color: !inCM
                                  ? colors.themeColor
                                  : colors.input_Black,
                                fontSize: 16,
                              }}>
                              IN
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {touched.length && errors.length && (
                        <View style={style.error}>
                          <Text style={{color: colors.Red}}>
                            {errors.length}
                          </Text>
                        </View>
                      )}

                      {/* Pet Weight Field */}

                      <View style={{paddingVertical: 5}}>
                        <EventText title={'Pet Weight'} />
                        <View style={[style.inputContainer]}>
                          <TextInput
                            value={values.weight}
                            onChangeText={handleChange('weight')}
                            onBlur={() => setFieldTouched('weight')}
                            blurOnSubmit={false}
                            disableFullscreenUI={true}
                            autoCapitalize="none"
                            returnKeyType="done"
                            keyboardType={'decimal-pad'}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            style={{width: '70%'}}
                            placeholder={'Enter Weight'}
                            placeholderTextColor={
                              colors.input_Black
                            }></TextInput>
                          <TouchableOpacity
                            onPress={() => {
                              setKG(true);
                            }}
                            style={{paddingHorizontal: 20}}>
                            <Text
                              style={{
                                color: inKG
                                  ? colors.themeColor
                                  : colors.input_Black,
                                fontSize: 16,
                              }}>
                              KG
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setKG(false);
                            }}>
                            <Text
                              style={{
                                color: !inKG
                                  ? colors.themeColor
                                  : colors.input_Black,
                                fontSize: 16,
                              }}>
                              LB
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {touched.weight && errors.weight && (
                        <View style={style.error}>
                          <Text style={{color: colors.Red}}>
                            {errors.weight}
                          </Text>
                        </View>
                      )}

                      {/* Pet Breed Field */}

                      <TextInputField
                        value={values.breed}
                        onChangeText={handleChange('breed')}
                        onBlur={() => setFieldTouched('breed')}
                        blurOnSubmit={false}
                        disableFullscreenUI={true}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit}
                        style={style.titleInput}
                        placehodler={'Enter Breed'}
                        placeholderTextColor={colors.input_Black}
                        error={errors.breed}
                        touched={touched.breed}
                        title={'Pet Breed'}
                      />

                      {/* Save Info Button */}

                      <TouchableOpacity
                        style={style.save}
                        onPress={handleSubmit}>
                        <Text style={style.btnText}>Save</Text>
                      </TouchableOpacity>
                    </View>
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

export default EditProfile;
