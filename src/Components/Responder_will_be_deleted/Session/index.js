/* eslint-disable radix */
import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  Alert,
  Picker,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Icon, Container, CheckBox} from 'native-base';

import moment from 'moment/min/moment-with-locales';
import base64 from 'react-native-base64';

import {PictureDownload} from '../../../../src/components/common/';

import {
  CustomPicker,
  ButtonBlock,
  CustomDatePicker,
  CustomTimePicker,
  LoadingComponent,
} from '../../Global';
import {Colors, Images, Constants} from '../../../Theme';
import styles from './styles';

class Session extends Component {
  static navigationOptions = {
    headerShown: false,
    drawerLabel: () => null,
  };
  state = {
    repeatType: '0',
    reasonState: null,
    typeOfSession: 'InPerson',
    startDateState: new Date(),
    endDateState: new Date(),
  };

  constructor(props) {
    super(props);
    const {
      useridi,
      name,
      token,
      lastname,
      startTime,
      endTime,
      startDate,
      repeat,
      endDate,
      description,
      classType,
      sessionid,
    } = this.props;

    const tempTime = '12:00';

    let startTimeState = startTime
      ? moment(`${startDate} ${startTime}`, 'MM-DD-YYYY HH:mm A').format()
      : this.getUtcTimeSelfMadeTime(new Date());

    let endTimeState = endTime
      ? moment(`${startDate} ${endTime}`, 'MM-DD-YYYY HH:mm A').format()
      : this.getUtcTimeSelfMadeTime(new Date());

    let startDateState = startDate
      ? moment(`${startDate} ${tempTime}`, 'MM-DD-YYYY HH:mm').format()
      : new Date();

    let endDateState =
      endDate && repeatType !== 0
        ? moment(`${endDate}`, 'YYYY-MM-DD HH:mm').format()
        : new Date();

    let reasonState = description || null;
    let repeatType = repeat || '0';
    let typeOfSession = classType
      ? classType === '0'
        ? 'InPerson'
        : 'Virtual'
      : 'InPerson';

    startTimeState = new Date(startTimeState);
    endTimeState = new Date(endTimeState);
    startDateState = new Date(startDateState);
    if (repeatType !== 0) {
      endDateState = new Date(endDateState);
    }

    this.state.userid = useridi;
    this.state.name = name;
    this.state.tokenval = token;
    this.state.lastname = lastname;
    this.state.sessionId = sessionid;

    this.state.startTimeState = startTimeState;
    this.state.endTimeState = endTimeState;
    this.state.startDateState = startDateState;
    this.state.endDateState = endDateState;
    this.state.reasonState = reasonState;
    this.state.repeatType = String(repeatType);
    this.state.typeOfSession = typeOfSession;
  }

  getUtcTimeSelfMadeTime(mytime) {
    let tymSymbol = this.props.schoolTimeSymbol;
    let tymValue = this.props.schooltimeValue;

    let parseTymValue = parseInt(tymValue);
    let utc = moment.utc(mytime).format('YYYY-MM-DD HH:mm');

    if (tymSymbol === '+') {
      utc = moment(utc).add(parseTymValue, 'hours');
    } else {
      utc = moment(utc).subtract(parseTymValue, 'hours');
    }

    utc = utc.toString();
    let time = utc.split(' GMT');

    return new Date(time[0]);
  }

  getUtcTimeSelfMadeTimeReverse(mytime) {
    let tymSymbol = this.props.schoolTimeSymbol;
    let tymValue = this.props.schooltimeValue;
    let parseTymValue = parseInt(tymValue);

    let mommentTime = moment(mytime).format('YYYY-MM-DD HH:mm');
    let utc = null;
    if (tymSymbol === '+') {
      utc = moment(mommentTime).subtract(parseTymValue, 'hours');
    } else {
      utc = moment(mommentTime).add(parseTymValue, 'hours');
    }

    let mommentTimeutc = moment(utc).format('YYYY-MM-DD HH:mm');

    return mommentTimeutc;
  }

  // |||||||||||||||||||||||||||||||||||||||||||||||
  // |||||||||||||||||   Submit    |||||||||||||||||
  // |||||||||||||||||||||||||||||||||||||||||||||||

  submitSession = async () => {
    const {
      startDateState,
      endDateState,
      repeatType,
      reasonState,
      typeOfSession,
      startTimeState,
      endTimeState,
    } = this.state;

    if (!this.state.loading) {
      this.setState({loading: true});

      if (this.verification()) {
        let startTimeFormat = this.getUtcTimeSelfMadeTimeReverse(
          startTimeState,
        );
        let endTimeFormat = this.getUtcTimeSelfMadeTimeReverse(endTimeState);

        startTimeFormat = moment(startTimeFormat).format('HH:mm');
        endTimeFormat = moment(endTimeFormat).format('HH:mm');

        const startDate = moment(startDateState).format('YYYY-MM-DD');
        const endDate = moment(endDateState).format('YYYY-MM-DD');

        let startValue = moment(
          `${startDate} ${startTimeFormat}`,
          'YYYY-MM-DD HH:mm',
        ).format('YYYY-MM-DD HH:mm');

        let endValue = moment(
          `${startDate} ${endTimeFormat}`,
          'YYYY-MM-DD HH:mm',
        ).format('YYYY-MM-DD HH:mm');
        let rEndDate = null;

        if (repeatType !== '0') {
          rEndDate = `${endDate} 23:59`;
        } else {
          rEndDate = `${startDate} 23:58`;
        }

        let body = {
          repeated: base64.encode('0'),
          startDateTime: base64.encode(startValue),
          endDateTime: base64.encode(endValue),
          rEndDate: base64.encode(rEndDate),
          type: base64.encode(repeatType),
          description: base64.encode(reasonState),
          causeData: base64.encode(JSON.stringify([])),
          classType: base64.encode(typeOfSession === 'InPerson' ? '0' : '1'),
        };

        this.setState({loading: true});
        if (this.state.sessionId) {
          body = {
            ...body,
            scheduleId: base64.encode(this.state.sessionId.toString()),
          };
          this.editSessionApi(JSON.stringify(body), this.state.tokenval);
        } else {
          body = {...body, userId: base64.encode(this.state.userid.toString())};
          this.addSessionApi(JSON.stringify(body), this.state.tokenval);
        }

        // -- TODO  --  this body is for development purpose
        let bodyCopy = {
          startDateTime: startValue,
          endDateTime: endValue,
          type: repeatType,
          repeated: '0',
          rEndDate: rEndDate,
          description: reasonState,
          causeData: JSON.stringify([]),
          classType: typeOfSession === 'InPerson' ? '0' : '1',
        };

        if (this.state.sessionId) {
          bodyCopy = {
            ...bodyCopy,
            scheduleId: base64.encode(this.state.sessionId.toString()),
          };
        } else {
          bodyCopy = {...bodyCopy, userId: this.state.userid.toString()};
        }
      } else {
        this.setState({loading: false});
      }
    }
  };

  verification = () => {
    const {
      startDateState,
      endDateState,
      repeatType,
      reasonState,
      typeOfSession,
      startTimeState,
      endTimeState,
    } = this.state;

    let endTimeDifference = moment(startTimeState).add(15, 'minutes');
    let schoolTime = this.getUtcTimeSelfMadeTime(new Date());

    let stDate = moment(startDateState).format('YYYY-MM-DD');
    let endTimeFormat = moment(endTimeFormat).format('HH:mm');

    let selectedDate = moment(`${stDate} ${endTimeFormat}`, 'YYYY-MM-DD');

    if (
      selectedDate.isBefore(moment(new Date(), 'YYYY-MM-DD')) &&
      moment(startTimeState, 'hh:mm').isBefore(moment(schoolTime, 'hh:mm'))
    ) {
      Alert.alert(
        'Session Error',
        'Start time sould be greater than current time',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (!startDateState) {
      Alert.alert('Session Error', 'Please select start date of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!startTimeState) {
      Alert.alert('Session Error', 'Please select start time of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!endTimeState) {
      Alert.alert('Session Error', 'Please select end time of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!typeOfSession) {
      Alert.alert('Session Error', 'Please select type of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!reasonState) {
      Alert.alert('Session Error', 'Please sepecify the reason of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (
      moment('23:44', 'hh:mm').isBefore(
        moment(
          `${startTimeState.getHours()}:${startTimeState.getMinutes()}`,
          'hh:mm',
        ),
      )
    ) {
      Alert.alert('Session Error', 'start time should be less then 11:44 PM', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (
      moment(endTimeState, 'hh:mm').isBefore(moment(startTimeState, 'hh:mm'))
    ) {
      Alert.alert(
        'Session Error',
        'End time should be greater than start time',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (
      moment(endTimeState, 'hh:mm').isBefore(moment(endTimeDifference, 'hh:mm'))
    ) {
      Alert.alert(
        'Session Error',
        'start and end time difference should be >= 15 minutes',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (repeatType && repeatType !== '0') {
      if (!endDateState) {
        Alert.alert('Session Error', 'Please select end date', [
          {text: 'Try Again'},
        ]);
        return false;
      } else if (
        moment(endDateState, 'YYYY-MM-DD').isBefore(
          moment(startDateState, 'YYYY-MM-DD'),
        )
      ) {
        Alert.alert('End date cannot be earlier than start date', [
          {text: 'Try Again'},
        ]);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  addSessionApi = (body, token) => {
    let API = `${Constants.API}schedule/create?token=${token}`;
    fetch(API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.invisiblesession(false);
        if (responseJson.data.code === 200) {
          this.setState({loading: false});
        } else {
          setTimeout(() => {
            Alert.alert('Session Error', responseJson.data.message.toString(), [
              {text: 'Okay'},
            ]);
          }, 1100);
          return null;
        }
      })
      .catch(error => {
        setTimeout(() => {
          Alert.alert('Network Error', JSON.stringify(error), [{text: 'Okay'}]);
        }, 1100);
      });
  };

  editSessionApi = (body, token) => {
    let API = `${Constants.API}schedule/update?token=${token}`;
    fetch(API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.code === 200) {
          this.setState({loading: false});
          this.props.invisiblesession(false);
        } else {
          this.setState({loading: false});
          setTimeout(() => {
            Alert.alert('Session Error', responseJson.data.message.toString(), [
              {text: 'Okay'},
            ]);
          }, 1100);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // |||||||||||||||||||||||||||||||||||||||||||||||
  // |||||||||||||||||   Render    |||||||||||||||||
  // |||||||||||||||||||||||||||||||||||||||||||||||
  render() {
    return (
      <View style={styles.constainer}>
        {this.state.loading && <LoadingComponent />}

        <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            {/*
            // ============================================
            // ==============   Picture    ================
            // ============================================
          */}
            <PictureDownload
              imagename={this.props.imagename}
              showbig={false}
              userid={this.state.userid}
              token={this.state.tokenval}
              firstname={this.state.name}
              namet={this.state.lastname}
            />
            {/*
            // ===============================================
            // ==============   Name Label    ================
            // ===============================================
          */}
            <View style={styles.marginVertical_10}>
              <Text style={styles.welcome}>Session with {this.state.name}</Text>
            </View>

            {/*
            // ================================================
            // ==============   Date Picker    ================
            // ================================================
          */}
            <View style={styles.rowContainer}>
              <Image source={Images.calenderIcon} style={styles.rowIcon} />
              {/* <Text style={styles.rowLabel}>Start Date:</Text> */}
              <CustomDatePicker
                containerStyle={styles.dateTimePickerStyle}
                value={this.state.startDateState}
                onChange={(event, value) => {
                  this.setState({startDateState: value});
                }}
                minimumDate={new Date()}
              />
            </View>

            {/*
            // =====================================================
            // ==============   Start Time Picker   ================
            // =====================================================
          */}
            <View style={styles.rowContainer}>
              <Image source={Images.Clock} style={styles.rowIcon} />
              {/* <Text style={styles.rowLabel}>Start Time:</Text> */}
              <CustomTimePicker
                containerStyle={styles.dateTimePickerStyle}
                onChange={(event, value) => {
                  this.setState({startTimeState: value});
                }}
                value={this.state.startTimeState}
              />
            </View>

            {/*
            // =====================================================
            // ==============     End Time Picker   ================
            // =====================================================
          */}
            <View style={styles.rowContainer}>
              <Image source={Images.Clock} style={styles.rowIcon} />
              {/* <Text style={styles.rowLabel}>End Time:</Text> */}
              <CustomTimePicker
                containerStyle={styles.dateTimePickerStyle}
                onChange={(event, value) => {
                  this.setState({endTimeState: value});
                }}
                value={this.state.endTimeState}
              />
            </View>

            {/*
            // =============================================
            // ==============     Reason    ================
            // =============================================
          */}

            <View style={styles.viewContainerReason}>
              <Image style={styles.rowIconReason} source={Images.ReasonIcon} />
              {/* <Text style={styles.rowLabel}>Reason:</Text> */}
              <TextInput
                multiline={true}
                style={{width: '85%', minHeight: 30}}
                textAlign={'center'}
                placeholder="Reason for Session"
                value={this.state.reasonState}
                maxLength={240}
                onChangeText={e => {
                  this.setState({reasonState: e});
                }}
              />
            </View>

            {/*
            // =============================================
            // ==============     Repeat    ================
            // =============================================
          */}
            {Platform.OS === 'ios' ? (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.repeatText}>Repeat</Text>
                  <Icon name="refresh" style={styles.iconstyle} />
                  <CustomPicker
                    Text={'help'}
                    selectedValue={this.state.repeatType}
                    onValueChange={e => {
                      this.setState({
                        repeatType: e,
                      });
                    }}
                    options={[
                      {label: 'Never', value: '0'},
                      {label: 'Daily', value: '1'},
                      {label: 'Weekly', value: '2'},
                      {label: 'Monthly', value: '3'},
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => this.setState({typeOfSession: 'InPerson'})}>
                    <CheckBox
                      checked={this.state.typeOfSession === 'InPerson'}
                      color={Colors.themeColor}
                    />
                    <Text
                      style={{
                        ...styles.checkBoxText,
                        color:
                          this.state.typeOfSession === 'InPerson'
                            ? Colors.themeGrey
                            : Colors.themeLightGrey,
                      }}>
                      In-Person
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => this.setState({typeOfSession: 'Virtual'})}>
                    <CheckBox
                      checked={this.state.typeOfSession === 'Virtual'}
                      color={Colors.themeColor}
                    />
                    <Text
                      style={{
                        ...styles.checkBoxText,
                        color:
                          this.state.typeOfSession === 'Virtual'
                            ? Colors.themeGrey
                            : Colors.themeLightGrey,
                      }}>
                      Virtual
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.viewContainer}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => this.setState({typeOfSession: 'InPerson'})}>
                    <CheckBox
                      checked={this.state.typeOfSession === 'InPerson'}
                      color={Colors.themeColor}
                    />
                    <Text
                      style={{
                        ...styles.checkBoxText,
                        color:
                          this.state.typeOfSession === 'InPerson'
                            ? Colors.themeGrey
                            : Colors.themeLightGrey,
                      }}>
                      In-Person
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => this.setState({typeOfSession: 'Virtual'})}>
                    <CheckBox
                      checked={this.state.typeOfSession === 'Virtual'}
                      color={Colors.themeColor}
                    />
                    <Text
                      style={{
                        ...styles.checkBoxText,
                        color:
                          this.state.typeOfSession === 'Virtual'
                            ? Colors.themeGrey
                            : Colors.themeLightGrey,
                      }}>
                      Virtual
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewContainer}>
                  <Text style={styles.repeatText}>Repeat</Text>
                  <Icon name="refresh" style={styles.iconstyle} />
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.repeatType}
                    itemTextStyle={{fontFamily: 'Open Sans'}}
                    onValueChange={e => {
                      this.setState({
                        repeatType: e,
                      });
                    }}>
                    <Picker.Item label="Never" value="0" />
                    <Picker.Item label="Daily" value="1" />
                    <Picker.Item label="Weekly" value="2" />
                    <Picker.Item label="Monthly" value="3" />
                  </Picker>
                </View>
              </>
            )}

            {/*
            // =============================================
            // ==============     End Date  ================
            // =============================================
          */}
            {this.state.repeatType !== '0' && (
              <View style={styles.rowContainer}>
                <Image source={Images.calenderIcon} style={styles.rowIcon} />
                {/* <Text style={styles.rowLabel}>End Date:</Text> */}
                <CustomDatePicker
                  containerStyle={styles.dateTimePickerStyle}
                  value={this.state.endDateState}
                  onChange={(event, value) => {
                    this.setState({endDateState: value});
                  }}
                  minimumDate={new Date()}
                />
              </View>
            )}

            {/*
            // =============================================
            // ==============     Button    ================
            // =============================================
          */}
            <View style={styles.ButtonContainer}>
              <ButtonBlock
                buttonOnPress={() => this.submitSession()}
                buttonText={this.state.sessionId ? 'Update' : 'Schedule Now'}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default Session;
