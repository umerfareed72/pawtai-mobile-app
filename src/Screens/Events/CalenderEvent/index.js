import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Calendar} from 'react-native-calendars';
import EventHeader from '../../../Components/Events/EventHeader';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import colors from '../../../Theme/Colors';
import style from './style';
import Card from '../../../Components/Dashboard/Card';
import EventModal from '../../../Components/Modals/EventModal';
import BlankField from '../../../Components/BlankFieldComponent/BlankField';
import moment from 'moment';
import {Container, Content, Button, Segment, Text} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  my_pawtai_events,
  get_pawtai_calender_events,
  get_pawtai_event_list,
  save_event_detail,
  pick_Month,
  list_week_days,
} from '../../../Redux/actions/event.action';
import {
  baseURL,
  PAWTAI_CONST,
  PAWTAI_EVENTS_CONST,
  PROFILE_IMAGE_URL,
} from '../../../Theme/routes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {header} from '../../../Theme/Constants';
import axios from 'axios';
import Loader from '../../../Components/Loader/Loader';
import {EmojiHelper} from '../../../Theme/Helper/EmojiHelper';
import Indicator from '../../../Components/Loader/Indicator';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
const CalenderEvent = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  //Loading
  const [loader, setLoader] = useState(false);
  const [Screen, setScreen] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const event = useSelector(state => state.event);
  const [events, setEvents] = useState([]);
  //Pagination States for Upcoming Events
  const [loader2, setLoader2] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState('loaded');
  //Pagination States for My Events
  const [mypage, setmyPage] = useState(1);
  const [mydata, setmyData] = useState('loaded');

  //Show Calender Events
  const showCalender = () => {
    return (
      <Calendar
        current={event?.current_month}
        markedDates={event?.calender_events}
        theme={{
          selectedDayBackgroundColor: colors.white,
          selectedDayTextColor: colors.input_Black,
          dayTextColor: colors.input_Black,
          todayTextColor: colors.themeColor,
          selectedDotColor: colors.themeColor,
        }}
        markingType={'custom'}
        onDayPress={day => {
          const d = event?.event_lists?.find(i => {
            return i == day.dateString;
          });
          if (d) {
            setShow(true);
            setDate(moment(day.dateString).format('LL'));
            var mydate = new Date(day.dateString);
            listHandler(mydate);
          }
        }}
        onDayLongPress={day => {
          console.log(day);
        }}
        monthFormat={'yyyy MM'}
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        onMonthChange={async month => {
          const check = await checkConnected();
          if (check) {
            var mydate = new Date(month.dateString);
            var firstDay = new Date(mydate.getFullYear(), mydate.getMonth(), 1);
            var lastDay = new Date(
              mydate.getFullYear(),
              mydate.getMonth() + 1,
              0,
            );
            const requestBody = {
              start_date: moment(firstDay).format('YYYY-MM-DD'),
              end_date: moment(lastDay).format('YYYY-MM-DD'),
            };
            var currentMonth = new Date(month.dateString);
            dispatch(get_pawtai_calender_events(requestBody));
            dispatch(pick_Month(currentMonth));
            var firstDay = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              1,
            );
            const Body = {
              reload: true,
              page: 1,
              start_date: moment(firstDay).format('YYYY-MM-DD'),
              start_time: moment(firstDay).format('hh:mm:ss'),
            };
            dispatch(
              get_pawtai_event_list(Body, () => {
                setData('loaded');
                setPage(2);
                console.log('Event Loaded');
              }),
            );
            dispatch(
              my_pawtai_events(Body, () => {
                setmyData('loaded');
                setmyPage(2);
                setLoader(false);
              }),
            );
          } else {
            navigation.replace('ConnectivityScreen');
          }
        }}
        hideArrows={true}
        renderArrow={direction => <Arrow />}
        firstDay={1}
        renderHeader={date => {
          /*Return JSX*/
        }}
        enableSwipeMonths={true}
      />
    );
  };
  const getCalenderData = async () => {
    const check = await checkConnected();
    if (check) {
      var firstDay = new Date(
        event?.current_month.getFullYear(),
        event.current_month.getMonth(),
        1,
      );
      var lastDay = new Date(
        event.current_month.getFullYear(),
        event?.current_month.getMonth() + 1,
        0,
      );
      const requestBody = {
        start_date: moment(firstDay).format('YYYY-MM-DD'),
        end_date: moment(lastDay).format('YYYY-MM-DD'),
      };
      dispatch(get_pawtai_calender_events(requestBody));
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  //Get All Events
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      getCalenderData();
    } else {
      navigation.replace('ConnectivityScreen');
    }
  }, []);
  //My Events
  const get_My_Events = () => {
    var firstDay = new Date(
      event?.current_month.getFullYear(),
      event?.current_month.getMonth(),
      1,
    );
    const requestBody = {
      reload: true,
      page: 1,
      start_date: moment(firstDay).format('YYYY-MM-DD'),
      start_time: moment(firstDay).format('hh:mm:ss'),
    };

    setLoader(true);
    dispatch(
      my_pawtai_events(requestBody, () => {
        setmyData('loaded');
        setmyPage(2);
        setLoader(false);
      }),
    );
  };
  useEffect(async () => {
    const check = await checkConnected();
    if (check) {
      if (isFocused) {
        //Weekdays
        const week_days = [
          {
            id: 1,
            title: 'Monday',
            status: 0,
          },
          {
            id: 2,
            title: 'Tuesday',
            status: 0,
          },
          {
            id: 3,
            title: 'Wednesday',
            status: 0,
          },
          {
            id: 4,
            title: 'Thursday',
            status: 0,
          },
          {
            id: 5,
            title: 'Friday',
            status: 0,
          },
          {
            id: 6,
            title: 'Saturday',
            status: 0,
          },
          {
            id: 7,
            title: 'Sunday',
            status: 0,
          },
        ];
        getUpcoming_Events();
        get_My_Events();
        dispatch(list_week_days(week_days));
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  }, [isFocused]);
  //Upcoming Events
  const getUpcoming_Events = () => {
    var firstDay = new Date(
      event?.current_month.getFullYear(),
      event?.current_month.getMonth(),
      1,
    );
    const Body = {
      reload: true,
      page: 1,
      start_date: moment(firstDay).format('YYYY-MM-DD'),
      start_time: moment(firstDay).format('hh:mm:ss'),
    };
    dispatch(
      get_pawtai_event_list(Body, () => {
        setData('loaded');
        setPage(2);
        console.log('Event Loaded');
      }),
    );
  };
  //Load More Upcoming Events

  const loadMoreUpcomingEvents = async () => {
    const check = await checkConnected();
    if (check) {
      console.log('Current Page upcoming', page);
      setLoader2(true);
      var firstDay = new Date(
        event?.current_month.getFullYear(),
        event?.current_month.getMonth(),
        1,
      );
      const requestBody = {
        page: page,
        start_date: moment(firstDay).format('YYYY-MM-DD'),
        start_time: moment(firstDay).format('hh:mm:ss'),
      };

      dispatch(
        get_pawtai_event_list(requestBody, res => {
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
      navigation.replace('ConnectivityScreen');
    }
  };

  //Load More My Events
  const loadMoreMyEvents = async () => {
    const check = await checkConnected();
    if (check) {
      setLoader2(true);
      var firstDay = new Date(
        event?.current_month.getFullYear(),
        event?.current_month.getMonth(),
        1,
      );
      const requestBody = {
        page: mypage,
        start_date: moment(firstDay).format('YYYY-MM-DD'),
        start_time: moment(firstDay).format('hh:mm:ss'),
      };

      dispatch(
        my_pawtai_events(requestBody, res => {
          if (res == '') {
            setmyData(res);
            setLoader2(false);
          } else {
            setmyPage(mypage + 1);
            setmyData('loaded');
            setLoader2(false);
          }
        }),
      );
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  const listHandler = async val => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        start_date: moment(val).format('YYYY-MM-DD'),
        start_time: moment(val).format('hh:mm:ss'),
      };
      setLoader(true);
      try {
        axios({
          url: baseURL + PAWTAI_EVENTS_CONST + 'event-detail',
          method: 'GET',
          params: requestBody,
          headers: await header(),
        }).then(async res => {
          for (let i = 0; i < res.data.result.length; i++) {
            let firstObj = res.data.result[i];
            firstObj.title = EmojiHelper(firstObj.title);
          }
          setEvents(res.data.result);
          setLoader(false);
        });
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  const eventDetail = async item => {
    const check = await checkConnected();
    if (check) {
      const eventData = {
        id: item.id,
      };
      dispatch(
        save_event_detail(eventData, () => {
          navigation.navigate('EditEvent');
        }),
      );
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
      {!event?.loading ? (
        <View style={style.Container}>
          <Header
            backButton={false}
            title={'Calender'}
            navigation={navigation}
          />

          <View style={style.contentContainer}>
            <Segment style={style.segmentContainer}>
              <Button
                hitSlop={style.hitSlope}
                onPress={() => {
                  setScreen(true);
                }}
                first
                style={[
                  style.segment,
                  {
                    backgroundColor: Screen ? colors.themeColor : colors.white,
                  },
                ]}>
                <Text
                  style={[
                    style.segmentText,
                    {color: Screen ? colors.white : colors.themeColor},
                  ]}>
                  Events
                </Text>
              </Button>
              <Button
                hitSlop={style.hitSlope}
                onPress={() => {
                  setScreen(false);
                }}
                style={[
                  style.segment,
                  {
                    backgroundColor: Screen ? colors.white : colors.themeColor,
                  },
                ]}>
                <Text
                  style={[
                    style.segmentText,
                    {color: Screen ? colors.themeColor : colors.white},
                  ]}>
                  My Events
                </Text>
              </Button>
            </Segment>
            {Screen ? (
              <Container>
                <EventHeader
                  onPress={() => {
                    navigation.navigate('AddEvents');
                  }}
                  isImage={true}
                  title={moment(event.current_month).format('MMMM YYYY')}
                />
                {showCalender()}
                <View
                  style={{
                    marginVertical: 5,
                    borderWidth: 0.3,
                    borderColor: colors.input_light_gray,
                  }}
                />
                <EventHeader title={'Upcoming'} />

                {event?.upcoming_events != '' ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={event?.upcoming_events}
                    refreshControl={
                      <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={event?.loading}
                        onRefresh={() => {
                          getUpcoming_Events();
                        }}
                      />
                    }
                    renderItem={({item}) => (
                      <View style={{marginVertical: 5}}>
                        <TouchableOpacity
                          onPress={() => {
                            eventDetail(item);
                          }}>
                          <Card
                            showEmoji={true}
                            firstLetter={item?.pawtai?.name[0]}
                            title={item?.title}
                            profileImage={
                              PROFILE_IMAGE_URL + item?.pawtai?.image
                            }
                            date={
                              moment(item?.start_date).format('DD-MM-YYYY') +
                              ' - ' +
                              moment(item?.end_date).format('DD-MM-YYYY')
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    ListFooterComponent={() => {
                      return data != '' ? (
                        <>
                          {loader2 ? (
                            <View style={{paddingTop: 20}}>
                              <Loader loader_color={colors.black} />
                            </View>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                loadMoreUpcomingEvents();
                              }}
                              style={style.loadMoreBtn}>
                              <Text style={{color: colors.themeColor}}>
                                See More
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      ) : (
                        <View style={{padding: 30}}>
                          <BlankField title="No More Upcoming Events" />
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <BlankField title={'No Upcoming Events'} />
                )}
              </Container>
            ) : (
              <Container>
                <EventHeader title={'My Events'} />
                {event?.my_events != '' ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={event?.my_events}
                    refreshControl={
                      <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={event?.loading}
                        onRefresh={() => {
                          get_My_Events();
                        }}
                      />
                    }
                    renderItem={({item}) => (
                      <View style={{marginVertical: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            eventDetail(item);
                          }}>
                          <Card
                            showEmoji={true}
                            firstLetter={item?.pawtai?.name[0]}
                            title={item?.title}
                            profileImage={
                              PROFILE_IMAGE_URL + item?.pawtai?.image
                            }
                            date={
                              moment(item?.start_date).format('DD-MM-YYYY') +
                              ' - ' +
                              moment(item?.end_date).format('DD-MM-YYYY')
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    ListFooterComponent={() => {
                      return mydata != '' ? (
                        <>
                          {loader2 && (
                            <View style={{paddingTop: 20}}>
                              <Loader loader_color={colors.black} />
                            </View>
                          )}
                        </>
                      ) : (
                        <View style={{padding: 30}}>
                          <BlankField title="No More Events" />
                        </View>
                      );
                    }}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                      loadMoreMyEvents();
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <BlankField title={'No Events'} />
                )}
              </Container>
            )}
          </View>
        </View>
      ) : (
        <Indicator />
      )}
      {show && (
        <EventModal
          loading={loader}
          date={date}
          show={show}
          onPressHide={() => setShow(false)}
          eventList={events}
        />
      )}
    </>
  );
};

export default CalenderEvent;
