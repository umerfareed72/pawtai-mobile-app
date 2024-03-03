import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  View,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../Components/Header/Header';
import MyStatusBar from '../../Components/Header/statusBar';
import Card from '../../Components/Dashboard/Card';
import colors from '../../Theme/Colors';
import style from './style';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';
import BlankField from '../../Components/BlankFieldComponent/BlankField';
import {
  add_comments,
  get_all_Comments,
} from '../../Redux/actions/post_pawtai.action';
import {TouchableOpacity} from 'react-native';
import {Images} from '../../Theme';
import {SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {useIsFocused} from '@react-navigation/native';
import {EmojiHelper} from '../../Theme/Helper/EmojiHelper';
import LikeCard from '../../Components/Modals/LikeCard';
import {userNameRegEx} from '../../Theme/routes';
import {SimpleChangeTextHelper} from '../../Theme/Helper/SimpleChangeTextHelper';
import {InputChangeHelper} from '../../Theme/Helper/InputChangeHelper';
const NotificationDetail = props => {
  const notification = useSelector(state => state.notification);
  const auth = useSelector(state => state.auth);
  const pawtai = useSelector(state => state.pawtai);
  const {info} = notification?.notificationInfo;
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(false);
  //Redux
  const dispatch = useDispatch();
  let scrollRef = useRef(null);
  //Screen
  const [Screen, setScreen] = useState(true);
  //Submit Post
  const submit = async () => {
    const ChangeText = await InputChangeHelper(comment, mentionedArray);
    const simpleText = await SimpleChangeTextHelper(comment, mentionedArray);

    const requestBody = {
      post_id: info?.post?.id,
      text: ChangeText,
      index: notification?.post_index,
    };
    if (comment != '') {
      setMessages([
        ...messages,
        {
          text: EmojiHelper(comment),
          user: {username: auth?.userdata?.username},
        },
      ]);
      dispatch(
        add_comments(requestBody, () => {
          scrollRef?.current?.scrollToEnd({animated: true});
          console.log('Message Send');
        }),
      );
    } else {
      Toast.show('Type your reply please...', {
        position: Toast.position.TOP,
      });
    }
    setComment('');
  };
  //Set Messages
  useEffect(async () => {
    setMessages(notification?.Comments);
    scrollRef?.current?.scrollToEnd({animated: true});
  }, []);
  //Mention User Api Hanlder
  var mentionedArray = pawtai?.mentioned_users;
  //Render Suggesstions
  const renderSuggestionsRow = () => {
    return (
      <View style={{paddingVertical:10}}>

      <FlatList
        data={mentionedArray}
        renderItem={({item}) => {
          return (
            <View style={style.mentionStyle}>
              <ParsedText
                style={style.mentionText}
                parse={[
                  {
                    pattern: userNameRegEx,
                    style: style.username,
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
       </View>
     
    );
  };

  //Name Selected
  const handleNamePress = item => {
    let mention = item?.username.replace('@', '');
    setComment(comment + mention);
    setActive(false);
  };

  ////////Handle Text
  const handlePostText = value => {
    setComment(value);
    let splitArr = value.split(' ');
    if (matchSlitValue(splitArr, '@')) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  //Match String Value
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
        backgroundColor={colors.themeColor}
        barStyle="light-content"
      />

      <SafeAreaView
        style={
          Platform.OS == 'ios'
            ? {
                height:
                  Dimensions.get('window').height -
                  Dimensions.get('window').height / 13,
                backgroundColor: colors.white,
              }
            : style.Container
        }>
        <KeyboardAvoidingView
          style={{height: '100%'}}
          behavior={Platform.OS == 'ios' ? 'padding' : false}>
          <Header
            backButton={true}
            title={'Post Detail'}
            navigation={props.navigation}
          />
          <View style={style.contentContainer}>
            <View style={style.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setScreen(true);
                }}
                style={[
                  style.button,
                  {backgroundColor: Screen ? colors.themeColor : colors.white},
                ]}>
                <Text
                  style={[
                    style.btnText,
                    {color: Screen ? colors.white : colors.themeColor},
                  ]}>
                  Reply
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setScreen(false);
                }}
                style={[
                  style.button,
                  {backgroundColor: Screen ? colors.white : colors.themeColor},
                ]}>
                <Text
                  style={[
                    style.btnText,
                    {color: Screen ? colors.themeColor : colors.white},
                  ]}>
                  Likes
                </Text>
              </TouchableOpacity>
            </View>
            {Screen ? (
              <>
                {messages != '' ? (
                  <FlatList
                    ref={scrollRef}
                    refreshControl={
                      <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={notification?.loading}
                        onRefresh={() => {
                          const requestBody = {
                            post_id: info?.post?.id,
                          };
                          dispatch(get_all_Comments(requestBody));
                        }}
                      />
                    }
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollRef.current.scrollToEnd()}
                    onLayout={() => scrollRef.current.scrollToEnd()}
                    data={messages}
                    renderItem={({item}) => (
                      <Card
                        title={item?.text}
                        date={moment(item.created_at)
                          .format('h:mm A')
                          .toString()}
                        ispadding={true}
                        firstLetter={item?.user?.username[0]}
                        // iswith={'with'}
                        // mention={'@username'}
                        isSlash={true}
                        username={item?.user?.username}
                      />
                    )}
                  />
                ) : (
                  <BlankField title={'No Coversation Available'} />
                )}
              </>
            ) : (
              <>
                {info?.likes != '' ? (
                  <FlatList
                    data={info?.likes}
                    renderItem={({item}) => (
                      <LikeCard
                        firstLetter={item?.user?.username[0]}
                        username={item?.user?.username}
                      />
                    )}
                  />
                ) : (
                  <BlankField title={'No Likes'} />
                )}
              </>
            )}
            {active && renderSuggestionsRow()}
            {Screen && (
              <View style={style.btnContainer}>
                <TextInput
                  placeholderTextColor={colors.input_Black}
                  onChangeText={text => {
                    handlePostText(text);
                  }}
                  multiline={true}
                  style={style.textColor}
                  onSubmitEditing={submit}
                  returnKeyType={'done'}
                  placeholder={'Add a Reply...'}>
                  <ParsedText
                    style={style.mentionText}
                    parse={[
                      {
                        pattern: userNameRegEx,
                        style: style.username,
                      },
                      {type: 'url', style: style.username},
                    ]}
                    childrenProps={{allowFontScaling: false}}>
                    {comment}
                  </ParsedText>
                </TextInput>
                <TouchableOpacity
                  style={style.imageBtn}
                  onPress={e => submit(e)}>
                  <Image source={Images.sned} style={style.imageStyle} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default NotificationDetail;
