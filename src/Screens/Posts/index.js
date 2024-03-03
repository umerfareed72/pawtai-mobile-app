import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Keyboard,
  Alert,
} from 'react-native';
import Header from '../../Components/Header/Header';
import MyStatusBar from '../../Components/Header/statusBar';
import {Colors, Images} from '../../Theme';
import styles from './style';
import LikeCard from '../../Components/Modals/LikeCard';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused} from '@react-navigation/native';
import UserModal from '../../Components/Modals/UserModal';
import {Container, Content, Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {baseURL, POST_PAWTAI_CONST, userNameRegEx} from '../../Theme/routes';
import ParsedText from 'react-native-parsed-text';
import Indicator from '../../Components/Loader/Indicator';
import {header} from '../../Theme/Constants';
import axios from 'axios';
import ActionButton from 'react-native-action-button';
import colors from '../../Theme/Colors';
import Toast from 'react-native-tiny-toast';
import {Platform} from 'react-native';
import {Dimensions} from 'react-native';
import {update_post_list_data} from '../../Redux/actions/post_pawtai.action';
import {InputChangeHelper} from '../../Theme/Helper/InputChangeHelper';
import {SimpleChangeTextHelper} from '../../Theme/Helper/SimpleChangeTextHelper';
import {list_mentioned_pawtai} from '../../Redux/actions/pawtai.action';
import {checkConnected} from '../../Theme/Helper/ConnectivityHelper';

//Image Crop Picker Options
let options = {
  multiple: true,
  mediaType: 'any',
  maxFiles: 20,
};
let videoOptions = {
  multiple: true,
  mediaType: 'video',
};

const AddPost = props => {
  const isFocues = useIsFocused();
  const pawtai = useSelector(state => state.pawtai);
  const auth = useSelector(state => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [postInput, setPostInput] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selecttedPawtaiID, setselectedPawtaiID] = useState('');
  const [selecttedPawtaiName, setselectedPawtaiName] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  //Fetch Pawtai List
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      setselectedPawtaiName(
        pawtai?.all_Pawtai[pawtai?.all_Pawtai.length - 1]?.name,
      );
      setselectedPawtaiID(
        pawtai?.all_Pawtai[pawtai?.all_Pawtai.length - 1]?.id,
      );
      const requestBody = {
        id: pawtai?.all_Pawtai[pawtai?.all_Pawtai.length - 1]?.id,
      };
      dispatch(list_mentioned_pawtai(requestBody));
    } else {
      props?.navigation.replace('ConnectivityScreen');
    }
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  var mentionedArray = pawtai?.mentioned_users;
  //Open Gallery
  const showGallery = async () => {
    ImagePicker.openPicker(options)
      .then(images => {
        var array3 = attachment.concat(images);
        console.log(array3, 'Array 3');
        const distinctItems = [
          ...new Map(array3.map(item => [item['size'], item])).values(),
        ];
        setAttachment(distinctItems);
        console.log(distinctItems);
      })
      .catch(error => {
        console.log('User cancelled image picker');
        console.log(error);
      });
  };
  // Open Camera
  const showCamera = () => {
    ImagePicker.openCamera(options)
      .then(images => {
        console.log('Path', images);
        setAttachment([...attachment, images]);
      })
      .catch(error => {
        console.log('User cancelled image picker');
      });
  };
  // Record Video
  const showVideoRecorder = () => {
    ImagePicker.openCamera(videoOptions)
      .then(video => {
        console.log('Path', video);
        setAttachment([...attachment, video]);
      })
      .catch(error => {
        console.log('User cancelled image picker');
      });
  };
  //Remove Image & Video Items
  const removeImage = (index, item) => {
    attachment.splice(index, 1);
    setAttachment(
      attachment.filter(item => {
        return item;
      }),
    );
  };
  // Pick Pawtai
  const getListValue = val => {
    setselectedPawtaiID(val?.id);
    setselectedPawtaiName(val?.name);
    const requestBody = {
      id: val?.id,
    };
    dispatch(list_mentioned_pawtai(requestBody));
    setShowModal(false);
  };
  // Render List Items
  const renderAttachMents = () => {
    return (
      <FlatList
        numColumns={3}
        data={attachment}
        contentContainerStyle={{paddingBottom: 25}}
        renderItem={({item, index}) => (
          <ImageBackground
            // key={item.id.toString()}
            source={{
              uri: item.path,
            }}
            style={styles.imagebgStyle}
            imageStyle={styles.mgStyle}>
            <TouchableOpacity
              onPress={() => removeImage(index, item)}
              style={styles.crossIcon}>
              <Icon style={styles.icon} name="cross" type="Entypo" />
            </TouchableOpacity>
          </ImageBackground>
        )}
      />
    );
  };
  //Publish  Post
  const publishPostHandler = async () => {
    const check = await checkConnected();
    if (check) {
      const ChangeText = await InputChangeHelper(postInput, mentionedArray);
      const simpleText = await SimpleChangeTextHelper(
        postInput,
        mentionedArray,
      );
      if (attachment.length <= 20) {
        setLoading(true);
        var form = new FormData();
        form.append('pawtai_id', selecttedPawtaiID);
        form.append('text', ChangeText);
        attachment.map((item, index) => {
          form.append('attachments[]', {
            uri: item.path,
            type: item.mime,
            name: item.path.substring(item.path.lastIndexOf('/') + 1),
          });
        });

        form.append('file_type', 'image');
        form.append('original_text', simpleText);

        axios({
          url: baseURL + POST_PAWTAI_CONST + 'add',
          method: 'post',
          headers: await header(),
          data: form,
        })
          .then(res => {
            setAttachment([]);
            setLoading(false);
            Toast.show('Post Uploaded Successfully', {
              position: Toast.position.TOP,
            });
            dispatch(update_post_list_data(res?.data?.result?.post));
            setPostInput('');
            props.navigation.navigate('HomeScreen');
          })
          .catch(error => {
            console.log(error);
            Alert.alert('Unable to Upload Post');
            setLoading(false);
          });
      } else {
        Alert.alert('You can select max 20 items');
      }
    } else {
      props?.navigation.replace('ConnectivityScreen');
    }
  };
  //////Mention Userername
  const renderSuggestionsRow = () => {
    return (
      <FlatList
        data={mentionedArray}
        renderItem={({item}) => {
          return (
            <View style={styles.mentionStyle}>
              <ParsedText
                style={styles.mentionText}
                parse={[
                  {
                    pattern: userNameRegEx,
                    style: styles.username,
                    onPress: () => {
                      handleNamePress(item);
                    },
                  },
                ]}
                childrenProps={{allowFontScaling: false}}>
                {item?.username}
              </ParsedText>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const handleNamePress = item => {
    let mention = item?.username.replace('@', '');
    setPostInput(postInput + mention);
    setActive(false);
  };

  ////////Handle Text
  const handlePostText = value => {
    setPostInput(value);
    let splitArr = value.split(' ');
    if (matchSlitValue(splitArr, '@')) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const matchSlitValue = (splitArr, value) => {
    for (let i = 0; i < splitArr.length; i++) {
      if (splitArr[i] === value) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={Colors.themeColor}
        barStyle="light-content"
      />
      {!loading ? (
        <View style={styles.Container}>
          <Header
            onPressBtn={() => publishPostHandler()}
            backButton={false}
            title={'Post'}
            navigation={props.navigation}
            btnText={
              postInput != '' && selecttedPawtaiName != null ? true : false
            }
            text={'Publish'}
          />
          <View style={styles.contentContainer}>
            <LikeCard
              isbold={true}
              isBtn={true}
              firstLetter={auth?.userdata?.username[0]}
              username={auth?.userdata?.username}
              pawtai={selecttedPawtaiName}
              onPress={() => {
                setShowModal(!showModal);
              }}></LikeCard>
            <Container>
              <Content showsVerticalScrollIndicator={false}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.textContainer}>
                    {active ? (
                      <View style={{marginLeft: 20}}>
                        {renderSuggestionsRow()}
                      </View>
                    ) : null}
                    <TextInput
                      textAlignVertical={'top'}
                      multiline={true}
                      style={[styles.inputStyle]}
                      onChangeText={text => {
                        handlePostText(text);
                      }}
                      underlineColorAndroid={'transparent'}
                      autoCorrect={true}
                      autoFocus={true}
                      autoCapitalize={'sentences'}
                      placeholder={
                        'What would you like to let your pawtai know?'
                      }>
                      <ParsedText
                        style={styles.mentionText}
                        parse={[
                          {
                            pattern: userNameRegEx,
                            style: styles.username,
                          },
                          {type: 'url', style: styles.username},
                        ]}
                        childrenProps={{allowFontScaling: false}}>
                        {postInput}
                      </ParsedText>
                    </TextInput>
                  </View>

                  {/* List of Pawtai */}
                </ScrollView>
                <View style={styles.imageContainer}>{renderAttachMents()}</View>
              </Content>
            </Container>
          </View>

          {/* Buttons */}

          <ActionButton
            style={{marginBottom: 25}}
            hideShadow={true}
            offsetY={
              Platform.OS == 'ios' && isKeyboardVisible
                ? Dimensions.get('screen').height == 667
                  ? 325
                  : 380
                : 40
            }
            buttonColor={colors.themeColor}
            size={50}>
            <ActionButton.Item size={40} onPress={() => showCamera()}>
              <Image style={styles.imageStyle} source={Images.camera} />
            </ActionButton.Item>
            <ActionButton.Item
              size={40}
              onPress={() => {
                showVideoRecorder();
              }}>
              <Image style={styles.imageStyle} source={Images.video} />
            </ActionButton.Item>
            <ActionButton.Item
              size={40}
              onPress={() => {
                showGallery();
              }}>
              <Image style={styles.imageStyle} source={Images.gallery} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      ) : (
        <Indicator />
      )}
      {showModal && (
        <UserModal
          pawtai_List={pawtai?.all_Pawtai}
          onPressHide={() => setShowModal(false)}
          show={showModal}
          getValue={getListValue}
        />
      )}
    </>
  );
};

export default AddPost;
