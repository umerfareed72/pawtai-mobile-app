import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import FlatCard from '../../Components/Dashboard/FlatCard';
import Header from '../../Components/Header/Header';
import MyStatusBar from '../../Components/Header/statusBar';
import {
  add_Likes,
  get_all_Posts,
  remove_Likes,
} from '../../Redux/actions/post_pawtai.action';
import colors from '../../Theme/Colors';
import style, {Wrapper} from './style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {PROFILE_IMAGE_URL} from '../../Theme/routes';
import {
  all_Pawtai,
  list_mentioned_pawtai,
} from '../../Redux/actions/pawtai.action';
import BlankField from '../../Components/BlankFieldComponent/BlankField';
import Loader from '../../Components/Loader/Loader';
import {checkConnected} from '../../Theme/Helper/ConnectivityHelper';
import {save_Notification_Info} from '../../Redux/actions/notification.action';
import Indicator from '../../Components/Loader/Indicator';

//Component
const HomeScreen = props => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [screenloader, setScreenLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState('loaded');
  const isFocues = useIsFocused();
  const dispatch = useDispatch();
  const pawtai = useSelector(state => state.post_pawtai);
  //ActionSheet Buttons
  var BUTTONS = ['Edit Post', 'Delete This Post', 'Cancel'];
  var DESTRUCTIVE_INDEX = 1;
  var CANCEL_INDEX = 2;

  // Get All Pawtai
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      setLoader(true);
      const requestBody = {
        page: page,
        // reload: true,
      };
      dispatch(
        get_all_Posts(requestBody, () => {
          console.log('Page  post loaded');
          setPage(page + 1);
          setLoader(false);
        }),
      );
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  }, []);

  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      if (isFocues) {
        dispatch(all_Pawtai());
      }
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  }, [isFocues]);

  //Like Post
  const likePostHandler = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      setDisableBtn(true);
      const requestBody = {
        post_id: item?.id,
        index: index,
      };
      if (!item.isLike) {
        dispatch(
          add_Likes(requestBody, () => {
            console.log('Like Added');
            // dispatch(get_all_Posts());
          }),
        );
      } else {
        dispatch(
          remove_Likes(requestBody, () => {
            console.log('Like Removed');
            // dispatch(get_all_Posts());
          }),
        );
      }
      setTimeout(() => {
        setDisableBtn(false);
      }, 1000);
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  };
  //Show Video Full Screen
  const showFullScreen = val => {
    props.navigation.navigate('VideoScreen', {
      videoUrl: val?.uri?.file_path,
    });
  };
  //Get All Comments
  const getAllComments = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      setScreenLoader(true);
      const requestBody1 = {
        id: item?.pawtai.id,
      };
      dispatch(list_mentioned_pawtai(requestBody1));
      const requestBody = {
        post_id: item?.id,
        index: index,
      };
      dispatch(
        save_Notification_Info(requestBody, () => {
          setScreenLoader(false);
          props.navigation.navigate('PostDetailScreen');
        }),
      );
    } else {
      props.navigation.replace('ConnectivityScreen');
    }
  };
  //Load More Posts
  const loadMoreNotifications = async () => {
    const check = await checkConnected();
    if (check) {
      setLoader2(true);
      console.log('current Page', page);
      const requestBody = {
        page: page,
      };
      dispatch(
        get_all_Posts(requestBody, res => {
          if (res == '') {
            setData(res);
            setLoader2(false);
          } else {
            setPage(page + 1);
            setData('loaded');
            setLoader2(false);
          }
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
      {!screenloader ? (
        <View style={style.Container}>
          <Header
            backButton={false}
            title={'Activity'}
            navigation={props.navigation}
          />
          {/* ///////////////////// List of All Posts ///////////////////////  */}
          {!loader ? (
            <>
              {pawtai?.post_pawtai_list != '' ? (
                <View style={style.contentContainer}>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={false}
                        onRefresh={() => {
                          const requestBody = {
                            page: 1,
                            reload: true,
                          };
                          dispatch(
                            get_all_Posts(requestBody, () => {
                              console.log('Page 1 post loaded');
                              setPage(2);
                            }),
                          );
                        }}
                      />
                    }
                    showsVerticalScrollIndicator={false}
                    data={pawtai?.post_pawtai_list}
                    renderItem={({item, index}) => {
                      return (
                        <FlatCard
                          disableCardPress={true}
                          disableLike={disableBtn}
                          renderImages={true}
                          title={item?.text}
                          date={moment(item.created_at)
                            .format('h:mm A')
                            .toString()}
                          username={item?.user?.username}
                          profileImage={PROFILE_IMAGE_URL + item?.pawtai?.image}
                          firstLetter={item?.pawtai?.name[0]}
                          mention={'@username'}
                          likeCount={item?.likes_count}
                          commentCount={item.comments_count}
                          onPress={() =>
                            props.navigation.navigate('MediaItemsScreen', {
                              items: item.attachments,
                            })
                          }
                          onPressComment={() => getAllComments(item, index)}
                          items={item}
                          isLiked={
                            !item.isLike
                              ? colors.input_Black
                              : colors.themeColor
                          }
                          onPlayVideo={showFullScreen}
                          onPressLikes={() => {
                            likePostHandler(item, index);
                          }}
                          createdDate={moment(item?.created_at)
                            .format('MMMM DD')
                            .toString()}
                          previousDate={moment(
                            pawtai?.post_pawtai_list[
                              Math.min(index, index - 1) < 0
                                ? 0
                                : Math.min(index, index - 1)
                            ]?.created_at,
                          )
                            .format('MMMM DD')
                            .toString()}
                          isCommented={
                            !item.isComment
                              ? colors.input_Black
                              : colors.themeColor
                          }
                          // onLongPress={() => {
                          //   ActionSheet.show(
                          //     {
                          //       options: BUTTONS,
                          //       cancelButtonIndex: CANCEL_INDEX,
                          //       destructiveButtonIndex: DESTRUCTIVE_INDEX,
                          //       title: 'Post Setting',
                          //     },
                          //     buttonIndex => {
                          //       if (buttonIndex == 0) {
                          //       } else if (buttonIndex == 1) {
                          //       }
                          //     },
                          //   );
                          // }}
                          index={index}
                        />
                      );
                    }}
                    ListFooterComponent={() => {
                      return data != '' ? (
                        <>
                          {loader2 && (
                            <View style={{paddingTop: 20}}>
                              <Loader loader_color={colors.black} />
                            </View>
                          )}
                        </>
                      ) : (
                        <View style={{padding: 30}}>
                          <BlankField title="No More Post Available" />
                        </View>
                      );
                    }}
                    onMomentumScrollEnd={() => {
                      !pawtai?.loading && loadMoreNotifications();
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              ) : (
                <BlankField
                  title="No post available to Preview"
                  showBtn={true}
                  btnText={'Post Now'}
                  onPress={() => props?.navigation.navigate('PostPawtai')}
                />
              )}
            </>
          ) : (
            <BlankField title="Loading...." />
          )}
        </View>
      ) : (
        <Indicator />
      )}
    </>
  );
};

export default HomeScreen;
