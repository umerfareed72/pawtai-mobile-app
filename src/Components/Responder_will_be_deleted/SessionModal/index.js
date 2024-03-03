/* eslint-disable no-alert */
/* eslint-disable radix */
import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  AsyncStorage,
  Picker,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon, Container, CheckBox} from 'native-base';

import DatePicker from 'react-native-datepicker';
import moment from 'moment/min/moment-with-locales';
import base64 from 'react-native-base64';

import {
  LoadingComponent,
  MyDatePicker,
  PictureDownload,
} from '../../../../src/components/common/';

import {
  CustomPicker,
  ButtonBlock,
  TimePicker,
  CustomDatePicker,
} from '../../Global';
import {Colors, Images, Constants} from '../../../Theme';
import {timeConversion} from '../../../Theme/utils';
import styles from './styles';

class SessionModal extends Component {
  static navigationOptions = {
    headerShown: false,
    drawerLabel: () => null,
  };
  state = {
    value: 0,
    PickerValue: '',
    textinput: '',
    modalVisible1: false,
    name: '',
    userid: 0,
    modalVisible: false,
    selectedFruits: [],
    selectedarray: [],
    renderdata: [],
    tokenval: 0,
    lastname: '',
    endtime: '',
    startlimit: '',
    startdatevalue: '',
    starttimevalue: '',
    loading: false,
    mintime: '',
    repeatType: '0',
    selectsecond: 'enddate',
    enddate: '',
    enddateLimit: '',
    starttimevalue1: '',
    endtime1: '',
    wavesarray: [],
    selectAll: false,
    showStartTimeModel: false,
    showEndTimeModel: false,
    reasonState: null,
    typeOfSession: 'Virtual',
    timeValue: new Date(),
    startDateState: new Date(),
  };

  setdate(date) {
    this.hideEndDateModel();
    if (date.length > 6) {
    } else {
      date = moment(date).format('HH:mm');
    }

    let dataPointer = date.split(' ');
    let add = 0;
    if (dataPointer[1] === 'PM') {
      add = 12;
    }
    let d1 = new Date(); // get current date
    let d = new Date(); // get current date
    let array = date.split(':');
    let remainder = parseInt(array[1]) % 5;
    if (remainder !== 0) {
      remainder = 5 - remainder;
    }
    d1.setHours(
      parseInt(parseInt(array[0]) + add),
      parseInt(array[1]) + remainder,
      0,
      0,
    );
    this.setState({finalEndtimevalue: d1.getHours() + ':' + d1.getMinutes()});
    d1.setHours(
      parseInt(parseInt(array[0]) + add),
      parseInt(array[1]) + remainder,
      0,
      0,
    );
    d.setHours(d1.getHours(), d1.getMinutes(), 0, 0);

    let getCurrentTime = moment(new Date()).format('HH:mm');
    if (Platform.OS === 'android') {
      if (
        moment(date, 'hh:mm').isBefore(moment(getCurrentTime, 'hh:mm')) ||
        moment(date, 'hh:mm').isBefore(
          moment(this.state.starttimevalue, 'hh:mm'),
        )
      ) {
        alert('error');
      } else {
        this.setState({
          endtime: d,
          finalEndtimevalue: d,
        });
      }
    } else {
      this.setState({
        endtime: d,
        finalEndtimevalue: d,
      });
    }
  }
  setenddate(date) {
    this.hideEndDateModel();
    if (date.length > 6) {
    } else {
      date = moment(date).format('HH:mm');
    }
    this.setState({
      enddate: date,
      showStartTimeModel: false,
      showEndTimeModel: false,
    });
  }
  setstarttime(dated) {
    this.hideStartDateModel();
    if (dated.length > 6) {
    } else {
      dated = moment(dated).format('HH:mm');
    }

    let dataPointer = dated.split(' ');

    let d1 = new Date(); // get current date

    let d = new Date(); // get current date
    let array = dated.split(':');
    let remainder = parseInt(array[1]) % 5;
    if (remainder !== 0) {
      remainder = 5 - remainder;
    }
    let add = 0;
    if (dataPointer[1] === 'PM') {
      add = 12;
    }

    d1.setHours(
      parseInt(parseInt(array[0]) + add),
      parseInt(array[1]) + remainder,
      0,
      0,
    );
    this.setState({finalStarttimevalue: d1.getHours() + ':' + d1.getMinutes()});
    d.setHours(d1.getHours(), d1.getMinutes() + 15, 0, 0);

    let getCurrentTime = moment(new Date()).format('HH:mm');
    if (Platform.OS === 'android') {
      if (moment(dated, 'hh:mm').isBefore(moment(getCurrentTime, 'hh:mm'))) {
        alert('error');
      } else {
        this.setState({
          starttimevalue: dated,
          startlimit: d,
          endtime: d,
          finalEndtimevalue: d,
          showStartTimeModel: false,
          showEndTimeModel: false,
        });
      }
    } else {
      this.setState({
        starttimevalue: dated,
        startlimit: d,
        endtime: d,
        finalEndtimevalue: d,
        showStartTimeModel: false,
        showEndTimeModel: false,
      });
    }
  }
  constructor(props) {
    super(props);

    this.state.userid = this.props.useridi;
    this.state.name = this.props.name;
    this.state.tokenval = this.props.token;
    this.state.lastname = this.props.lastname;

    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let mint = new Date().getMinutes();
    month = month + 1;

    if (month.toString().length === 1) {
      month = '0' + month;
    }
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    if (mint.toString().length === 1) {
      mint = '0' + mint;
    }
    let datevalue = year + '-' + month + '-' + day;

    let utctime = moment(
      datevalue + ' ' + hours + ':' + mint,
      'YYYY-MM-DD HH:mm',
    )
      .utc()
      .format('YYYY-MM-DD HH:mm');
    let newtime = this.getUtcTimeSelfMadeTime(utctime);

    this.state.mintime = newtime;

    AsyncStorage.getItem('wavesitem', (error, result) => {
      if (result === null) {
      } else {
        this.state.wavesarray = JSON.parse(result);
        this.state.wavesarray.unshift({id: 'all', name: 'Select All'});
      }
    });
  }
  onsetstartdate = val => {
    this.setState({
      startdatevalue: val,
    });

    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let mint = new Date().getMinutes();
    month = month + 1;

    if (month.toString().length === 1) {
      month = '0' + month;
    }
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    if (mint.toString().length === 1) {
      mint = '0' + mint;
    }
    let datevalue = year + '-' + month + '-' + day;

    let utctime = moment(
      datevalue + ' ' + hours + ':' + mint,
      'YYYY-MM-DD HH:mm',
    )
      .utc()
      .format('YYYY-MM-DD HH:mm');
    let newtime = this.getUtcTimeSelfMade(utctime);

    newtime = newtime.split(' ');

    let datearray = val.split('-');
    let d = new Date(); // get current date
    d.setDate(parseInt(datearray[2]) + 1);
    this.setState({
      enddateLimit: d,
    });
    // repeat end date end.

    if (val === newtime[0]) {
      let newtimeutc = moment(
        datevalue + ' ' + hours + ':' + mint,
        'YYYY-MM-DD HH:mm',
      )
        .utc()
        .format('YYYY-MM-DD HH:mm');
      let newtimedate = this.getUtcTimeSelfMadeTime(newtimeutc);
      this.state.mintime = newtimedate;
      this.state.starttimevalue = newtimedate;
      let newtimedate1 = newtimedate;
      newtimedate1 = moment(newtimedate1).add(15, 'minutes');
      this.setState({
        startlimit: newtimedate1,
        finalEndtimevalueL: newtimedate1,
        endTime: newtimedate1,
        startTime: newtimedate,
        mintime: newtimedate,
      });
    } else {
      let ds = new Date(); // get current date
      ds.setHours(ds.getHours(), ds.getMinutes(), 0, 0);
      this.setState({
        mintime: null,
      });
      ds = new Date();
      ds.setHours(ds.getHours(), ds.getMinutes() + 15, 0, 0);
      this.setState({
        startlimit: ds,
      });
    }
  };

  setoff() {
    if (this.state.loading === true) {
      setTimeout(() => {
        this.setState({loading: false});
      }, 7000);
    }
  }

  onSelectedItemsChange = selectedItems => {
    let stringitem = selectedItems.toString();
    stringitem = stringitem.split(',');
    if (this.state.selectAll === true) {
      //check the tag;
      let tag = false;

      stringitem.map(keyc => {
        if (keyc === 'unselect') {
          tag = true;
        }
      });
      if (!tag) {
        this.state.wavesarray[0].id = 'all';
        this.state.wavesarray[0].name = 'Select All';
        this.setState({
          selectAll: false,
          wavesarray: this.state.wavesarray,
          selectedItems: [],
          selectedarray: [],
          selectedFruits: [],
        });
        return;
      }
    }

    this.state.selectedFruits = [];
    let flag = true;
    this.setState({selectedFruits: []});

    this.setState({selectedarray: stringitem});
    stringitem.map(keyc => {
      if (keyc === 'all') {
        flag = false;
        this.selectAll('all', stringitem);
        return;
      } else {
        this.state.wavesarray.map(keyitem => {
          if (keyitem.id === keyc) {
            this.state.selectedFruits.push(keyitem.name);
            this.setState({
              selectedFruits: this.state.selectedFruits,
            });
          }
        });
      }
    });
    if (flag) {
      this.setState({selectedItems});
    }
    this.setState({selectedarray: stringitem});
  };

  onValueChange(value) {
    this.setState({
      repeatType: value,
    });
  }

  onValueChangesecond(value) {
    this.setState({
      selectsecond: value,
    });
  }

  returnEnddate() {
    if (this.state.repeatType !== '0') {
      return (
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontFamily: 'Open Sans', alignSelf: 'center'}}>
            Select Repeat Type
          </Text>
          <Picker
            style={{
              width: '100%',
              alignSelf: 'center',
              margin: 0,
              padding: 0,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              marginHorizontal: 0,
              marginVertical: 0,
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}
            selectedValue={this.state.selectsecond}
            onValueChange={this.onValueChangesecond.bind(this)}>
            <Picker.Item label="Never" value="dailyNever" />
            <Picker.Item label="End Date" value="enddate" />
          </Picker>
        </View>
      );
    }
  }

  returnpickenddate() {
    if (this.state.repeatType !== '0') {
      return (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 10,
          }}>
          <DatePicker
            style={{width: '100%', alignSelf: 'center'}}
            date={this.state.enddate}
            mode={'date'}
            minimumDate={
              this.state.enddateLimit === ''
                ? new Date()
                : this.state.enddateLimit
            }
            placeholder={'Select End Date'}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={false}
            iconSource={Images.calenderIcon}
            showIcon={true}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                margin: 0,
                height: 20,
                width: 20,
                alignSelf: 'center',
              },
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#e4e4e4',
              },
            }}
            onDateChange={date => {
              this.setenddate(date);
            }}
          />
        </View>
      );
    }
  }

  selectAll(key, stringitem) {
    let AllSelected = [];
    let flag = true;
    let length = this.state.wavesarray.length;
    if (key === 'all') {
      this.state.wavesarray[0].id = 'unselect';
      this.state.wavesarray[0].name = 'Unselect All';
      this.state.selectAll = true;
      this.state.selectedFruits = [];

      for (let i = 0; i < length; i++) {
        AllSelected.push(this.state.wavesarray[i].id);
        this.state.selectedFruits.push(this.state.wavesarray[i].name);
      }
      this.setState({
        selectedFruits: this.state.selectedFruits,
      });
    } else {
    }
    this.setState({
      selectedItems: AllSelected,
      wavesarray: this.state.wavesarray,
    });
    return flag;
  }

  showStartDateModel = () => {
    if (this.state.showStartTimeModel) {
      this.setState(
        {
          showStartTimeModel: false,
        },
        () => {
          this.setState({showStartTimeModel: true});
        },
      );
    } else {
      this.setState({showStartTimeModel: true});
    }
  };

  hideStartDateModel = () => {
    this.setState({showStartTimeModel: false});
  };

  showEndDateModel = () => {
    if (this.state.showEndTimeModel) {
      this.setState(
        {
          showEndTimeModel: false,
        },
        () => {
          this.setState({showEndTimeModel: true});
        },
      );
    } else {
      this.setState({showEndTimeModel: true});
    }
  };

  hideEndDateModel = () => {
    this.setState({showEndTimeModel: false});
  };

  returnEndDateForAndroid() {
    if (Platform.OS === 'android') {
      return (
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={event => {
            this.showEndDateModel();
          }}>
          <DatePicker
            style={{
              width: '100%',
              alignSelf: 'center',
            }}
            date={this.state.endtime}
            mode={'time'}
            maxDate={'23:55'}
            iconSource={Images.Clock}
            disabled={Platform.OS === 'android' ? true : false}
            minDate={this.state.startlimit}
            placeholder={'Select End Time'}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={false}
            format={'hh:mm A'}
            showIcon={true}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                margin: 0,
                height: 20,
                width: 20,
                alignSelf: 'center',
              },
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#e4e4e4',
                backgroundColor: '#fff',
              },
              disabled: {
                backgroundColor: '#fff',
              },
            }}
            TouchableComponent={TouchableNativeFeedback}
            onDateChange={date => {
              this.setdate(date);
            }}
          />
        </TouchableHighlight>
      );
    } else {
      return (
        <DatePicker
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
          date={this.state.endtime}
          mode={'time'}
          maxDate={'23:55'}
          iconSource={Images.Clock}
          disabled={Platform.OS === 'android' ? true : false}
          minDate={this.state.startlimit}
          placeholder={'Select End Time'}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour={false}
          format={'hh:mm A'}
          showIcon={true}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              margin: 0,
              height: 20,
              width: 20,
              alignSelf: 'center',
            },
            dateInput: {
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#e4e4e4',
              backgroundColor: '#fff',
            },
            disabled: {
              backgroundColor: '#fff',
            },
          }}
          onDateChange={date => {
            this.setdate(date);
          }}
        />
      );
    }
  }

  returnStartDateForAndroid() {
    if (Platform.OS === 'android') {
      return (
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={event => {
            this.showStartDateModel();
          }}>
          <DatePicker
            style={{
              width: '100%',
              alignSelf: 'center',
            }}
            date={this.state.starttimevalue}
            mode={'time'}
            disabled={Platform.OS === 'android' ? true : false}
            minDate={this.state.mintime}
            placeholder={'Select Start Time'}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={false}
            format={'hh:mm A'}
            maxDate={'23:40'}
            showIcon={true}
            iconSource={Images.Clock}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,

                margin: 0,
                height: 20,
                width: 20,
                alignSelf: 'center',
              },
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#e4e4e4',
              },
              disabled: {
                backgroundColor: '#fff',
              },
              // ... You can check the source to find the other keys.
            }}
            TouchableComponent={TouchableNativeFeedback}
            onDateChange={date => {
              this.setstarttime(date);
            }}
          />
        </TouchableHighlight>
      );
    } else {
      return (
        <DatePicker
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
          date={this.state.starttimevalue}
          mode={'time'}
          disabled={Platform.OS === 'android' ? true : false}
          minDate={this.state.mintime}
          placeholder={'Select Start Time'}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour={false}
          format={'hh:mm A'}
          maxDate={'23:40'}
          showIcon={true}
          iconSource={Images.Clock}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,

              margin: 0,
              height: 20,
              width: 20,
              alignSelf: 'center',
            },
            dateInput: {
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#e4e4e4',
            },
            disabled: {
              backgroundColor: '#fff',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setstarttime(date);
          }}
        />
      );
    }
  }

  CheckBoxClick = item => {
    this.setState({typeOfSession: item});
  };

  _setstarttime = dated => {
    this.hideStartDateModel();
    if (dated.length > 6) {
    } else {
      dated = moment(dated).format('HH:mm');
    }

    let dataPointer = dated.split(' ');

    let d1 = new Date(); // get current date

    let d = new Date(); // get current date
    let array = dated.split(':');
    let remainder = parseInt(array[1]) % 5;
    if (remainder !== 0) {
      remainder = 5 - remainder;
    }
    let add = 0;
    if (dataPointer[1] === 'PM') {
      add = 12;
    }

    d1.setHours(
      parseInt(parseInt(array[0]) + add),
      parseInt(array[1]) + remainder,
      0,
      0,
    );
    this.setState({finalStarttimevalue: d1.getHours() + ':' + d1.getMinutes()});
    d.setHours(d1.getHours(), d1.getMinutes() + 15, 0, 0);

    let getCurrentTime = moment(new Date()).format('HH:mm');
    if (Platform.OS === 'android') {
      if (moment(dated, 'hh:mm').isBefore(moment(getCurrentTime, 'hh:mm'))) {
        alert('error');
      } else {
        this.setState({
          starttimevalue: dated,
          startlimit: d,
          endtime: d,
          finalEndtimevalue: d,
          showStartTimeModel: false,
          showEndTimeModel: false,
        });
      }
    } else {
      this.setState({
        starttimevalue: dated,
        startlimit: d,
        endtime: d,
        finalEndtimevalue: d,
        showStartTimeModel: false,
        showEndTimeModel: false,
      });
    }
  };

  getUtcTimeSelfMade(mytime) {
    let tymSymbol = this.props.schoolTimeSymbol;
    let tymValue = this.props.schooltimeValue;

    if (tymSymbol === '+') {
      let parseTymValue = parseInt(tymValue);
      let utc = moment.utc(mytime).format('YYYY-MM-DD HH:mm');
      utc = moment(utc)
        .add(parseTymValue, 'hours')
        .format('YYYY-MM-DD HH:mm');
      return utc;
    } else {
      let parseTymValue = parseInt(tymValue);
      let utc = moment.utc(mytime).format('YYYY-MM-DD HH:mm');
      utc = moment(utc)
        .subtract(parseTymValue, 'hours')
        .format('YYYY-MM-DD HH:mm');
      return utc;
    }
  }

  getUtcTimeSelfMadeReverse(mytime) {
    let tymSymbol = this.props.schoolTimeSymbol;
    let tymValue = this.props.schooltimeValue;

    if (tymSymbol === '+') {
      let parseTymValue = parseInt(tymValue);
      let utc = moment.utc(mytime).format('YYYY-MM-DD HH:mm');
      utc = moment(utc)
        .subtract(parseTymValue, 'hours')
        .format('YYYY-MM-DD HH:mm');
      return utc;
    } else {
      let parseTymValue = parseInt(tymValue);
      let utc = moment.utc(mytime).format('YYYY-MM-DD HH:mm');
      utc = moment(utc)
        .add(parseTymValue, 'hours')
        .format('YYYY-MM-DD HH:mm');
      return utc;
    }
  }

  submitSession = async () => {
    const {
      startdatevalue,
      enddate,
      repeatType,
      reasonState,
      typeOfSession,
      startTime,
      endTime,
    } = this.state;

    if (this.verification()) {
      let startTimeFormat = this.getUtcTimeSelfMadeTimeReverse(startTime);
      let endTimeFormat = this.getUtcTimeSelfMadeTimeReverse(endTime);

      startTimeFormat = moment(startTimeFormat).format('HH:mm');
      endTimeFormat = moment(endTimeFormat).format('HH:mm');

      let startValue = moment(
        `${startdatevalue} ${startTimeFormat}`,
        'YYYY-MM-DD HH:mm',
      ).format('YYYY-MM-DD HH:mm');

      let endValue = moment(
        `${startdatevalue} ${endTimeFormat}`,
        'YYYY-MM-DD HH:mm',
      ).format('YYYY-MM-DD HH:mm');
      let rEndDate = null;

      if (repeatType !== '0') {
        rEndDate = `${enddate} 23:59`;
      } else {
        rEndDate = `${startdatevalue} 23:59`;
      }

      const body = JSON.stringify({
        userId: base64.encode(this.state.userid.toString()),
        startDateTime: base64.encode(startValue),
        endDateTime: base64.encode(endValue),
        rEndDate: base64.encode(rEndDate),
        type: base64.encode(repeatType),
        repeated: base64.encode('0'),
        description: base64.encode(reasonState),
        causeData: base64.encode(JSON.stringify([])),
        classType: base64.encode(typeOfSession === 'InPerson' ? '0' : '1'),
      });

      // -- TODO  --  this body is for development purpose
      const bodyCopy = JSON.stringify({
        userId: this.state.userid.toString(),
        startDateTime: startValue,
        endDateTime: endValue,
        type: repeatType,
        repeated: '0',
        rEndDate: rEndDate,
        description: reasonState,
        causeData: JSON.stringify([]),
        classType: typeOfSession === 'InPerson' ? '0' : '1',
      });
      console.log(bodyCopy);

      this.setState({loading: true});
      this.addSessionApi(body, this.state.tokenval);
    }
  };

  verification = () => {
    const {
      startdatevalue,
      enddate,
      repeatType,
      reasonState,
      typeOfSession,
      startTime,
      endTime,
    } = this.state;

    let endTimeDifference = moment(startTime).add(15, 'minutes');
    let schoolTime = this.getUtcTimeSelfMadeTime(new Date());

    let stDate = moment(startdatevalue).format('YYYY-MM-DD');
    let endTimeFormat = moment(endTimeFormat).format('HH:mm');

    let selectedDate = moment(`${stDate} ${endTimeFormat}`, 'YYYY-MM-DD');
    if (
      selectedDate.isBefore(moment(new Date(), 'YYYY-MM-DD')) &&
      moment(startTime, 'hh:mm').isBefore(moment(schoolTime, 'hh:mm'))
    ) {
      Alert.alert(
        'Session Error',
        'Start time sould be greater than current time',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (!startdatevalue) {
      Alert.alert('Session Error', 'Please select start date', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!startTime) {
      Alert.alert('Session Error', 'Please select start time of session', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (!endTime) {
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
    } else if (repeatType && repeatType !== '0' && !enddate) {
      Alert.alert('Session Error', 'Please select end date', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (moment('23:44', 'hh:mm').isBefore(moment(startTime, 'hh:mm'))) {
      Alert.alert('Session Error', 'start time should be less then 11:44 PM', [
        {text: 'Try Again'},
      ]);
      return false;
    } else if (moment(endTime, 'hh:mm').isBefore(moment(startTime, 'hh:mm'))) {
      Alert.alert(
        'Session Error',
        'End time should be greater than start time',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (
      moment(endTime, 'hh:mm').isBefore(moment(endTimeDifference, 'hh:mm'))
    ) {
      Alert.alert(
        'Session Error',
        'start and end time difference should be >= 15 minutes',
        [{text: 'Try Again'}],
      );
      return false;
    } else if (
      moment(enddate, 'YYYY-MM-DD').isBefore(
        moment(startdatevalue, 'YYYY-MM-DD'),
      )
    ) {
      Alert.alert('End date cannot be earlier then start date', [
        {text: 'Try Again'},
      ]);
      return false;
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
        if (responseJson.data.code === 200) {
          this.setState({loading: false});
          this.props.invisiblesession(false);
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

  timePicker = item => {
    this.setState({
      isTimePickerVisible: true,
      timeOf: item,
      timeValue: this.getUtcTimeSelfMadeTime(new Date()),
    });
  };

  onChange = (event, selectedDate) => {
    const timeOf = this.state.timeOf;
    if (event.type === 'dismissed') {
      this.setState({isTimePickerVisible: false});
    } else {
      const currentDate = selectedDate || this.state.timeValue;
      this.setState({
        timeValue: currentDate,
        isTimePickerVisible: false,
        [timeOf]: currentDate,
      });
    }
  };

  onChangeIos = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      this.setState({isTimePickerVisible: false});
    } else {
      const timeOf = this.state.timeOf;
      const currentDate = selectedDate || this.state.timeValue;
      this.setState({
        timeValue: currentDate,
        [timeOf]: currentDate,
      });
    }
  };

  onChangeDateStart = (event, selectedDate) => {
    let datelimit = new Date(); // get current date
    datelimit.setDate(parseInt(datelimit[2]) + 1);

    this.setState({startDateState: selectedDate, endDatelimit: datelimit});
  };

  render() {
    return (
      <ScrollView>
        <Container style={styles.constainer}>
          {/* Timer Picker */}
          {this.state.isTimePickerVisible && (
            <TimePicker
              cancelOnPress={() => {
                this.setState({
                  isTimePickerVisible: false,
                });
              }}
              onChange={this.onChange}
              onChangeIos={this.onChangeIos}
              value={this.state.timeValue}
            />
          )}
          <LoadingComponent show={this.state.loading} />
          {/* ---------------------------------------- */}

          <View style={styles.mainContainer}>
            <PictureDownload
              imagename={this.props.imagename}
              showbig={false}
              userid={this.state.userid}
              token={this.state.tokenval}
              firstname={this.state.name}
              namet={this.state.lastname}
            />
            <View style={styles.marginVertical_10}>
              <Text style={styles.welcome}>Session with {this.state.name}</Text>
            </View>

            <MyDatePicker
              schoolTimeSymbol={this.props.schoolTimeSymbol}
              schooltimeValue={this.props.schooltimeValue}
              setdatevalue={true}
              onsetstartdate={this.onsetstartdate}
              startset={false}
              start={false}
              mode={'date'}
              placeholdertext={'Select Date'}
              iconshow={true}
            />

            {/* Start Date picker */}
            <View style={styles.rowContainer}>
              <Image source={Images.calenderIcon} style={styles.rowIcon} />
              <Text style={styles.rowLabel}>Start Date:</Text>
              <CustomDatePicker
                containerStyle={{width: '60%'}}
                value={this.state.startDateState}
                onChange={this.onChangeDateStart}
                minimumDate={new Date()}
              />
            </View>

            {/* Start Time picker */}
            <View style={styles.rowContainer}>
              <Image source={Images.Clock} style={styles.rowIcon} />
              <Text style={styles.rowLabel}>Start Time:</Text>
              <TouchableOpacity
                onPress={() => this.timePicker('startTime')}
                style={{width: '90%'}}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...styles.timeText,
                    color: this.state.startTime ? '#000' : '#ccc',
                  }}>
                  {this.state.startTime
                    ? timeConversion(this.state.startTime)
                    : 'Select Start Time'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* End Time picker */}
            <View style={styles.rowContainer}>
              <Image style={styles.rowIcon} source={Images.Clock} />
              <Text style={styles.rowLabel}>End Time:</Text>
              <TouchableOpacity onPress={() => this.timePicker('endTime')}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...styles.timeText,
                    color: this.state.endTime ? '#000' : '#ccc',
                  }}>
                  {this.state.endTime
                    ? timeConversion(this.state.endTime)
                    : 'Select End Time'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Reason for session */}
            <View style={styles.viewContainerReason}>
              <Image style={styles.rowIconReason} source={Images.ReasonIcon} />
              <Text style={styles.rowLabel}>Reason:</Text>
              <TextInput
                multiline={true}
                style={{width: '60%', minHeight: 40}}
                placeholder="Reason for Session"
                onChangeText={e => {
                  this.setState({reasonState: e});
                }}
              />
            </View>

            {Platform.OS === 'ios' ? (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.repeatText}>Repeat</Text>
                  <Icon name="refresh" style={styles.iconstyle} />
                  <CustomPicker
                    Text={'help'}
                    selectedValue={this.state.repeatType}
                    onValueChange={this.onValueChange.bind(this)}
                    options={[
                      {label: 'Never', value: '0'},
                      {label: 'Daily', value: '1'},
                      {label: 'Weekly', value: '2'},
                      {label: 'Monthly', value: '3'},
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => this.CheckBoxClick('InPerson')}>
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
                    onPress={() => this.CheckBoxClick('Virtual')}>
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
                    onPress={() => this.CheckBoxClick('InPerson')}>
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
                    onPress={() => this.CheckBoxClick('Virtual')}>
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
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Never" value="0" />
                    <Picker.Item label="Daily" value="1" />
                    <Picker.Item label="Weekly" value="2" />
                    <Picker.Item label="Monthly" value="3" />
                  </Picker>
                </View>
              </>
            )}
            {/* {this.returnpickenddate()} */}

            {/* Start Date picker */}
            {this.state.repeatType !== '0' &&
              <View style={styles.rowContainer}>
                <Image source={Images.calenderIcon} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>End Date:</Text>
                <CustomDatePicker
                  containerStyle={{width: '60%'}}
                  value={this.state.startDateState}
                  onChange={this.onChangeDateStart}
                  minimumDate={new Date()}
                />
              </View>
            }

            <View style={styles.ButtonContainer}>
              <ButtonBlock
                buttonOnPress={() => this.submitSession()}
                buttonText="Schedule Now"
              />
            </View>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

export default SessionModal;
