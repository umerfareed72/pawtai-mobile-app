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
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import Card from '../../../Components/Dashboard/Card';
import colors from '../../../Theme/Colors';
import style from './style';
import moment from 'moment';
import HeaderCard from '../../../Components/HeaderCard/HeaderCard';
import {PROFILE_IMAGE_URL, userNameRegEx} from '../../../Theme/routes';
import BlankField from '../../../Components/BlankFieldComponent/BlankField';
import {
  add_comments,
  get_all_Comments,
} from '../../../Redux/actions/post_pawtai.action';
import {TouchableOpacity} from 'react-native';
import {Images} from '../../../Theme';
import LikeUserModal from '../../../Components/Modals/LikeUserCard';
import {SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {useIsFocused} from '@react-navigation/native';
import {EmojiHelper} from '../../../Theme/Helper/EmojiHelper';
import ParsedText from 'react-native-parsed-text';
import {InputChangeHelper} from '../../../Theme/Helper/InputChangeHelper';
import {SimpleChangeTextHelper} from '../../../Theme/Helper/SimpleChangeTextHelper';
const NotificationDetail = props => {
  const notification = useSelector(state => state.notification);
  const auth = useSelector(state => state.auth);
  const {info} = notification?.notificationInfo;
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  const pawtai = useSelector(state => state.pawtai);
  const post_pawtai = useSelector(state => state.post_pawtai);

  const dispatch = useDispatch();
  let scrollRef = useRef(null);
  const submit = async () => {
    const ChangeText = await InputChangeHelper(comment, mentionedArray);
    const simpleText = await SimpleChangeTextHelper(comment, mentionedArray);
    const post_index = post_pawtai?.post_pawtai_list.findIndex(item => {
      return info?.post?.id == item.id;
    });

    const requestBody = {
      post_id: info?.post?.id,
      text: ChangeText,
      index: post_index,
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
          console.log('Message Send');
          scrollRef?.current?.scrollToEnd({animated: true});
        }),
      );
    } else {
      Toast.show('Type your message please...', {
        position: Toast.position.TOP,
      });
    }
    setComment('');
  };
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
            title={'Notification Detail'}
            navigation={props.navigation}
          />
          <HeaderCard
            title={info?.post?.text}
            date={moment(info?.post?.created_at)
              .format('DD MMMM YYYY  h:mm A')
              .toString()}
            username={info?.post?.user?.username}
            // mention={'@username'}
            firstLetter={info?.post?.pawtai?.name[0]}
            profileImage={PROFILE_IMAGE_URL + info?.post?.pawtai?.image}
            likeCount={info?.post?.likes_count}
            onPressLikes={() => {
              setShowModal(true);
            }}
          />
          <View style={style.contentContainer}>
            <View>
              <Text style={style.headerText}>Replies</Text>
            </View>

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
                    date={moment(item.created_at).format('h:mm A').toString()}
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
            {active && renderSuggestionsRow()}
            <View style={style.btnContainer}>
              <TextInput
                placeholderTextColor={colors.input_Black}
                onChangeText={text => {
                  handlePostText(text);
                }}
                style={style.textColor}
                onSubmitEditing={submit}
                returnKeyType={'done'}
                multiline={true}
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
              <TouchableOpacity style={style.imageBtn} onPress={e => submit(e)}>
                <Image source={Images.sned} style={style.imageStyle} />
              </TouchableOpacity>
            </View>
          </View>

          {showModal && (
            <LikeUserModal
              onPressHide={() => setShowModal(false)}
              user_lists={info?.likes}
              show={showModal}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default NotificationDetail;
