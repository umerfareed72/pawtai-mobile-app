import React, {useState, useEffect} from 'react';
import {Content, Container} from 'native-base';
import {RefreshControl, View} from 'react-native';
import CardComponent from '../../../Components/CardComponent';
import {Images} from '../../../Theme';
import colors from '../../../Theme/Colors';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../Redux/actions/auth.action';
import {ActionSheet, Root} from 'native-base';
import {all_Pawtai, pawtaiProfile} from '../../../Redux/actions/pawtai.action';
import {useIsFocused} from '@react-navigation/native';
import {PROFILE_IMAGE_URL} from '../../../Theme/routes';
import LogoutModal from '../../../Components/Modals/LogoutModal';
import {ImageCard, InsideWrapper, ButtonWrapper} from './style';
import BlankField from '../../../Components/BlankFieldComponent/BlankField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';

const MyPawtai = ({navigation}) => {
  //Declarations

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const isFocues = useIsFocused();
  const pawtai = useSelector(state => state.pawtai);

  var BUTTONS = ['Add New Pawtai', 'Join Pawtai', 'Cancel'];
  var CANCEL_INDEX = 2;
  //Logout Request
  const Logout = async () => {
    const check = await checkConnected();
    if (check) {
      setShow(!show);
      AsyncStorage.getItem('fcmToken')
        .then(res => {
          console.log('DELETED FCM TOKEN', res);
          dispatch(
            logout(res, () => {
              navigation.replace('LoginScreen');
              console.log('Logout Successfully');
            }),
          );
        })
        .catch(error => {
          alert('Unable to logout');
          console.log('Storage Failed', error);
        });
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  // Get All Pawtai
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      if (isFocues) {
        dispatch(all_Pawtai());
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  }, [isFocues]);
  //Move to Profile
  const moveToProfile = async item => {
    const check = await checkConnected();
    if (check) {
      dispatch(
        pawtaiProfile(item, () => {
          navigation.navigate('PawtaiProfile');
        }),
      );
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  return (
    <Container>
      <Root>
        <MyStatusBar
          backgroundColor={colors.themeColor}
          barStyle="light-content"
        />
        <Header
          title={'My Pawtai'}
          btnText={true}
          text={'Logout'}
          onPressBtn={() => setShow(true)}
        />
        {/* Show All Pawtai Cards */}
        {pawtai?.all_Pawtai != '' ? (
          <Content
            style={{paddingHorizontal: 20}}
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={pawtai?.loading}
                onRefresh={() => {
                  dispatch(all_Pawtai());
                }}
              />
            }>
            <InsideWrapper>
              {pawtai?.all_Pawtai?.map((item, index) => (
                <CardComponent
                  key={index}
                  index={index}
                  onPress={() => moveToProfile(item)}
                  image={PROFILE_IMAGE_URL + item?.image}
                  btn={item?.image == null ? true : false}
                  title={item?.name}
                />
              ))}
            </InsideWrapper>
          </Content>
        ) : (
          <BlankField title="No Pawtai Available to Preview 🐾" />
        )}
        {/* Logout Modal */}

        {show && (
          <LogoutModal
            title={'Are you sure you want to logout?.'}
            show={show}
            onPress={Logout}
            onPressHide={() => setShow(false)}
          />
        )}

        {/* Floating Button */}

        <ButtonWrapper
          onPress={() => {
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: 'Notification Setting',
              },
              buttonIndex => {
                console.log(BUTTONS[buttonIndex]);
                if (buttonIndex == 0) {
                  navigation.push('AddPawtai', {show: true});
                } else if (buttonIndex == 1) {
                  navigation.push('JoinPawtai', {show: true});
                } else {
                }
              },
            );
          }}>
          <ImageCard source={Images.plus} />
        </ButtonWrapper>
      </Root>
    </Container>
  );
};

export default MyPawtai;
