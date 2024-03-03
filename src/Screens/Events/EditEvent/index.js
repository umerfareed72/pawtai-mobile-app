import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TogglerButton from '../../../Components/TogglerButton/TogglerButton';
import Header from '../../../Components/Header/Header';
import MyStatusBar from '../../../Components/Header/statusBar';
import colors from '../../../Theme/Colors';
import style from './style';
import EventText from '../../../Components/Events/EventText';
import {WP} from '../../../Theme/responsive';
import moment from 'moment';
import {ButtonComponent} from '../../../Components';
import DatePickerModal from '../../../Components/DateTimePicker/DatePicker';
import TimePickerModal from '../../../Components/DateTimePicker/TimePicker';
import TextInputField from '../../../Components/TextInputFields/TextInputField';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Fragment} from 'react';
import UserModal from '../../../Components/Modals/UserModal';
import {useSelector, useDispatch} from 'react-redux';
import Indicator from '../../../Components/Loader/Indicator';
import {
  cancel_pawtai_events,
  edit_pawtai_event,
  get_pawtai_calender_events,
  pick_week_day,
} from '../../../Redux/actions/event.action';
import Toast from 'react-native-tiny-toast';
import LogoutModal from '../../../Components/Modals/LogoutModal';
import {checkConnected} from '../../../Theme/Helper/ConnectivityHelper';
import * as Types from '../../../Redux/types/event_pawtai.types';

const EditEvent = ({navigation}) => {
  // Set Start Date
  const [startDate, setStartDate] = useState(new Date());
  // Set End Date
  const [EndDate, setEndDate] = useState(new Date());
  //Set Start Time
  const [startTime, setStartTime] = useState(new Date());
  //Set End Time
  const [endTime, setEndTime] = useState(new Date());
  // Set Current Date
  const [date, setDate] = useState(new Date());
  const [currentDate, setcurrentDate] = useState(new Date());
  // Set Current Time
  const [time, setTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Show Select Pawtai Picker
  const [showPawtaiPicker, setShowPawtaiPicker] = useState(false);
  //Show Week Button
  const [showWeekButton, setshowWeekButton] = useState(false);
  //ShoW Events
  const [showEvents, setShowEvents] = useState(false);
  //Button Toggler
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  //Picker Placeholder
  const [selectedPawtai, setselectedPawtai] = useState('');

  // Show Date Modal
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  // Show Time Modal
  const [showStartTimeModal, setShowStartTimeModal] = useState(false);
  const [showEndTimeModal, setShowEndTimeModal] = useState(false);

  //Set Show Events
  const [show, setShow] = useState(false);
  // Pawtai
  const pawtai = useSelector(state => state.pawtai);
  //Event
  const event = useSelector(state => state.event);
  //Selected Days
  const dispatch = useDispatch();

  //Set User Data in States
  useEffect(() => {
    const {event_detail} = event;
    setDate(new Date(event_detail?.start_date_time));
    setcurrentDate(new Date(event_detail?.end_date_time));

    setStartDate(event_detail?.start_date);
    setEndDate(event_detail?.end_date);

    //Start Time and End Time

    var start_time_utc = new Date(
      new Date(event_detail?.start_date_time).getTime() +
        new Date(event_detail?.start_date_time).getTimezoneOffset() * 60000,
    );
    var end_time_utc = new Date(
      new Date(event_detail?.end_date_time).getTime() +
        new Date(event_detail?.end_date_time).getTimezoneOffset() * 60000,
    );
    setTime(start_time_utc);
    setCurrentTime(end_time_utc);
    setStartTime(start_time_utc);
    setEndTime(end_time_utc);
    setselectedPawtai(event_detail?.pawtai);
    setShowEvents(true);
    if (event_detail?.repeat_type == 'Weekly') {
      setshowWeekButton(true);
    } else if (event_detail?.repeat_type == 'None') {
      setShowEvents(false);
      setToggleCheckBox2(false);
    } else if (event_detail?.repeat_type == 'Monthly') {
      setToggleCheckBox2(true);
    }
  }, []);

  // Select Date and Time
  const getStartValue = val => {
    setDate(val);
  };
  const getEndValue = val => {
    setcurrentDate(val);
  };
  //Set Date Values
  const ApplyStartValue = () => {
    setStartDate(date);
    setEndDate(date);
    setcurrentDate(date);
    setShowStartDateModal(false);
  };
  const ApplyEndValue = () => {
    setEndDate(currentDate);
    setShowEndDateModal(false);
  };

  const getStartTimeValue = val => {
    setTime(val);
  };
  const ApplyStartTimeValue = () => {
    setStartTime(time);
    setShowStartTimeModal(false);
  };
  const getEndTimeValue = val => {
    setCurrentTime(val);
  };
  const ApplyEndTimeValue = () => {
    setEndTime(currentTime);
    setShowEndTimeModal(false);
  };
  //Get Pawtai
  const getPawtai = val => {
    setShowPawtaiPicker(false);
    setselectedPawtai(val);
  };
  //Get Calender Data
  const getCalenderData = () => {
    var firstDay = new Date(
      event?.current_month.getFullYear(),
      event?.current_month.getMonth(),
      1,
    );
    var lastDay = new Date(
      event?.current_month.getFullYear(),
      event?.current_month.getMonth() + 1,
      0,
    );
    const requestBody = {
      start_date: moment(firstDay).format('YYYY-MM-DD'),
      end_date: moment(lastDay).format('YYYY-MM-DD'),
    };
    dispatch(get_pawtai_calender_events(requestBody));
  };
  //Select Week Days
  const EditEventHanlder = async values => {
    const check = await checkConnected();
    if (check) {
      dispatch({
        type: Types.Get_Pawtai_Calender_Event_Failure,
        payload: null,
      });
      const {event_detail} = event;
      let selectedDays = event?.weekDays.map(item => {
        return item;
      });
      if (selectedPawtai.id == undefined) {
        Toast.show('Select Pawtai Please...', {
          position: Toast.position.TOP,
        });
      } else {
        const requestBody = {
          pawtai_id: selectedPawtai?.id,
          title: values?.title,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(EndDate).format('YYYY-MM-DD'),
          start_time: moment(startTime, 'h:mm:ss A').format('HH:mm:ss'),
          end_time: moment(endTime, 'h:mm:ss A').format('HH:mm:ss'),
          repeat: showWeekButton
            ? JSON.stringify(selectedDays)
            : JSON.stringify('[]'),
          repeat_type: showWeekButton
            ? 'Weekly'
            : showEvents
            ? 'Monthly'
            : 'None',
          id: event?.event_detail?.id,
        };
        dispatch(
          edit_pawtai_event(requestBody, () => {
            getCalenderData();
            navigation?.navigate('CalenderEvent');
            Toast.show('Event Successfully Edited', {
              position: Toast.position.TOP,
            });
          }),
        );
      }
    } else {
      navigation.replace('ConnectivityScreen');
    }
  };
  const PickWeekdayHanlder = index => {
    dispatch(pick_week_day(index));
  };
  //Cancel Events
  const CancelEvent = async () => {
    const check = await checkConnected();
    if (check) {
      dispatch({
        type: Types.Get_Pawtai_Calender_Event_Failure,
        payload: null,
      });
      setShow(false);
      dispatch(
        cancel_pawtai_events(event?.event_detail.id, () => {
          getCalenderData();
          navigation?.navigate('CalenderEvent');
          Toast.show('Event Deleted', {
            position: Toast.position.TOP,
          });
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
            title={'Edit Event'}
            backButton={true}
            navigation={navigation}
          />
          <View style={style.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={{
                  title: event?.event_detail?.title
                    ? event?.event_detail?.title
                    : '',
                }}
                onSubmit={values => {
                  EditEventHanlder(values);
                }}
                validationSchema={yup.object().shape({
                  title: yup.string().required('Title is Required'),
                })}>
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  handleSubmit,
                }) => (
                  <Fragment>
                    <TextInputField
                      placehodler={'Enter Title'}
                      title={'Title'}
                      value={values.title}
                      onChangeText={handleChange('title')}
                      placeholderTextColor={colors.input_Black}
                      onBlur={() => setFieldTouched('title')}
                      onSubmitEditing={Keyboard.dismiss}
                      error={errors.title}
                      touched={touched.title}
                    />

                    {/* {Data Time Picker Buttons} */}
                    <View style={style.btnContainer}>
                      <View style={style.inputWidth}>
                        <EventText title={'Start Date'} />
                        <TouchableOpacity
                          style={style.daysDT}
                          onPress={() => {
                            setShowStartDateModal(!showStartDateModal);
                            // setDateIndex(1);
                          }}>
                          <Text style={style.inputText}>
                            {moment(startDate).format('MMM Do YY').toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={style.inputWidth}>
                        <EventText title={'Start Time'} />
                        <TouchableOpacity
                          style={style.daysDT}
                          onPress={() => {
                            setShowStartTimeModal(!showStartTimeModal);
                          }}>
                          <Text style={style.inputText}>
                            {moment(startTime).format('h:mm A').toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/*//////////////////////////////////// Pick Date //////////////////////////////////////// */}
                    <View style={style.btnContainer}>
                      <View style={style.inputWidth}>
                        <EventText title={'End Date'} />
                        <TouchableOpacity
                          style={style.daysDT}
                          onPress={() => {
                            setShowEndDateModal(!showEndDateModal);
                          }}>
                          <Text style={style.inputText}>
                            {moment(EndDate).format('MMM Do YY').toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={style.inputWidth}>
                        <EventText title={'End Time'} />
                        <TouchableOpacity
                          style={style.daysDT}
                          onPress={() => {
                            setShowEndTimeModal(!showEndTimeModal);
                          }}>
                          <Text style={style.inputText}>
                            {moment(endTime).format('h:mm A').toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {showStartDateModal && (
                      <DatePickerModal
                        onPressHide={() =>
                          setShowStartDateModal(!showStartDateModal)
                        }
                        show={showStartDateModal}
                        dateValue={date}
                        onDateChange={d => getStartValue(d)}
                        onPressDone={() => ApplyStartValue()}
                        minDate={new Date()}
                      />
                    )}
                    {showEndDateModal && (
                      <DatePickerModal
                        onPressHide={() =>
                          setShowEndDateModal(!showEndDateModal)
                        }
                        show={showEndDateModal}
                        dateValue={currentDate}
                        onDateChange={d => getEndValue(d)}
                        onPressDone={() => ApplyEndValue()}
                        minDate={new Date(startDate)}
                      />
                    )}
                    {/*/////////////////////////////////// Pick Time /////////////////////////////// */}

                    {showStartTimeModal && (
                      <TimePickerModal
                        onPressHide={() =>
                          setShowStartTimeModal(!showStartTimeModal)
                        }
                        show={showStartTimeModal}
                        dateValue={time}
                        onDateChange={d => getStartTimeValue(d)}
                        onPressDone={() => ApplyStartTimeValue()}
                        minTime={new Date()}
                      />
                    )}

                    {showEndTimeModal && (
                      <TimePickerModal
                        onPressHide={() =>
                          setShowEndTimeModal(!showEndTimeModal)
                        }
                        show={showEndTimeModal}
                        dateValue={currentTime}
                        onDateChange={d => getEndTimeValue(d)}
                        onPressDone={() => ApplyEndTimeValue()}
                      />
                    )}

                    {/* /////////////////////////////Pawtai Picker////////////////////////////////// */}
                    <View>
                      <EventText title={'Pawtai'} />
                      <TouchableOpacity
                        onPress={() => {
                          setShowPawtaiPicker(true);
                        }}
                        style={style.pawtai}>
                        <Text style={style.inputText}>
                          {selectedPawtai != ''
                            ? selectedPawtai?.name
                            : 'Select Pawtai'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TogglerButton
                      enable={showEvents}
                      onPress={value => setShowEvents(value)}
                      text={'Recurring Event'}
                    />

                    {/* //////////////////////////Checkbox///////////////////////// */}

                    {showEvents && (
                      <>
                        <View style={style.checkBoxContainer}>
                          <View style={style.checkRow}>
                            <CheckBox
                              disabled={false}
                              value={showWeekButton}
                              onFillColor={colors.themeColor}
                              onCheckColor={colors.white}
                              onValueChange={newValue => {
                                setshowWeekButton(newValue);
                                setToggleCheckBox2(false);
                              }}
                              tintColors={{true: '#7DE2BB', false: 'grey'}}
                              onTintColor={colors.white}
                              style={style.checkBoxLeftStyle}
                            />
                            <Text>Weekly</Text>
                          </View>

                          <View
                            style={[
                              style.checkRow,
                              {
                                marginRight: WP('25'),
                              },
                            ]}>
                            <CheckBox
                              disabled={false}
                              onFillColor={colors.themeColor}
                              onCheckColor={colors.white}
                              value={toggleCheckBox2}
                              onValueChange={newValue => {
                                setToggleCheckBox2(newValue);
                                setshowWeekButton(false);
                              }}
                              tintColors={{true: '#7DE2BB', false: 'grey'}}
                              onTintColor={colors.white}
                              style={style.CheckBoxRightStyle}
                            />
                            <Text>Monthly</Text>
                          </View>
                        </View>
                        {showWeekButton && (
                          <View style={style.weekContainer}>
                            {event?.weekDays?.map((item, index) => {
                              return (
                                <View key={index} style={style.weekDay}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      PickWeekdayHanlder(index);
                                    }}
                                    style={[
                                      style.btnContainerWeek,
                                      {
                                        backgroundColor: item?.status
                                          ? colors.themeColor
                                          : colors.themeGrey,
                                      },
                                    ]}>
                                    <Text style={{color: colors.white}}>
                                      {item?.title?.slice(0, 3)}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </>
                    )}
                    <View style={style.buttonContainer}>
                      <ButtonComponent
                        color={colors.themeColor}
                        buttonText={'Save'}
                        buttonOnPress={handleSubmit}
                      />
                      <ButtonComponent
                        color={colors.Red}
                        buttonText={'Delete'}
                        buttonOnPress={() => {
                          setShow(true);
                        }}
                      />
                    </View>
                  </Fragment>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      ) : (
        <Indicator />
      )}
      {show && (
        <LogoutModal
          title={'Are you sure you want to Delete?.'}
          show={show}
          onPress={CancelEvent}
          onPressHide={() => setShow(false)}
        />
      )}
      {showPawtaiPicker && (
        <UserModal
          pawtai_List={pawtai?.all_Pawtai}
          show={showPawtaiPicker}
          getValue={getPawtai}
          onPressHide={() => setShowPawtaiPicker(false)}
        />
      )}
    </>
  );
};

export default EditEvent;
