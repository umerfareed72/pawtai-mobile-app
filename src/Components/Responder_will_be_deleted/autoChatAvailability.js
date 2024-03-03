import React, {Component} from 'react';
import {
  View,
  Modal,
  ScrollView,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';

import {Icon} from 'native-base';
import {NavigationHeader, TimePicker} from '../Global';
import {Constants, Fonts, Images, Colors} from '../../Theme';
import {convertTime12to24, timeConversion} from '../../Theme/utils';

export default class AutoChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysArray: Constants.AutoChatDays,
      isloading: true,
      isTimePickerVisible: false,
      timeValue: new Date(),
      selectedTime: '',
    };
  }

  showTimePicker = (item, status) => {
    let timeItem = null;
    if (status === 'starttime') {
      timeItem = item.shortName + 'TimingStart';
    } else {
      timeItem = item.shortName + 'TimingEnd';
    }

    let time = timeConversion(this.state.days[timeItem]);
    time = convertTime12to24(time);
    let pickerTime = null;
    pickerTime = new Date(moment.utc(moment(`2020-01-01 ${time}`)).format());
    this.setState({
      timeValue: pickerTime,
      isTimePickerVisible: true,
      selectedTime: timeItem,
    });
  };

  componentDidMount() {
    this.getDays();
  }

  getDays = () => {
    fetch(Constants.API + 'chat-availability/list?token=' + this.props.token, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          days: responseJson.data.result,
          isloading: false,
        });
      });
  };

  changeStatus = item => {
    if (this.state.days[item.shortName + 'Status'] === 1) {
      this.state.days[item.shortName + 'Status'] = 0;
      this.setState({days: this.state.days});
    } else {
      this.state.days[item.shortName + 'Status'] = 1;
      this.setState({days: this.state.days});
    }
  };

  onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      this.setState({isTimePickerVisible: false});
    } else {
      const currentDate = selectedDate || this.state.timeValue;
      this.state.days[this.state.selectedTime] = currentDate;
      this.setState({
        timeValue: currentDate,
        isTimePickerVisible: false,
        days: this.state.days,
      });
    }
  };

  onChangeIos = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      this.setState({isTimePickerVisible: false});
    } else {
      const currentDate = selectedDate || this.state.timeValue;
      this.state.days[this.state.selectedTime] = currentDate;
      this.setState({
        timeValue: currentDate,
        days: this.state.days,
      });
    }
  };

  onConfirm = () => {
    this.state.days[this.state.selectedTime] = this.state.timeValue;
    this.setState({
      isTimePickerVisible: false,
      days: this.state.days,
    });
  };

  sessionUpdate = () => {
    for (let i = 0; i < this.state.daysArray.length; i++) {
      let timePrefix = this.state.daysArray[i].shortName;
      let startTime = moment(
        this.state.days[`${timePrefix}TimingStart`],
      ).format('HH:mm');
      let endTime = moment(this.state.days[`${timePrefix}TimingEnd`]).format(
        'HH:mm',
      );
      if (moment(endTime, 'hh:mm').isSameOrBefore(moment(startTime, 'hh:mm'))) {
        alert('Start time should be less than the end time');
        return;
      }
    }

    this.state.daysArray.forEach(element => {
      let timePrefix = element.shortName;
      let StartTime = this.state.days[`${timePrefix}TimingStart`];
      if (moment(StartTime).isValid(StartTime)) {
        this.state.days[`${timePrefix}TimingStart`] = moment(StartTime).format(
          'hh:mm A',
        );
      }
      let EndTime = this.state.days[`${timePrefix}TimingEnd`];
      if (moment(EndTime).isValid(EndTime)) {
        this.state.days[`${timePrefix}TimingEnd`] = moment(EndTime).format(
          'hh:mm A',
        );
      }
    });

    this.setState({isloading: true});
    fetch(
      Constants.API + 'chat-availability/update?token=' + this.props.token,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.days),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.code === 200) {
          this.getDays();
          this.setState({isloading: false}, () => {
            this.props.dismiss();
          });
        } else {
          alert(JSON.stringify(responseJson.data.message));
          this.setState({isloading: false});
        }
      })
      .catch(error => {
        this.setState({
          isloading: false,
        });
        alert(JSON.stringify(error));
        console.log('error', error);
      });
  };

  render() {
    return (
      <View>
        <Modal animationType="slide" transparent={false}>
          <View style={styles.flex1}>
            <NavigationHeader
              LeftText="Cancel"
              LeftOnPress={() => this.props.dismiss()}
              RightImageSrc={Images.WavesLogo}
              HeaderText="Chat Availability"
            />

            {this.state.isloading ? (
              <View style={styles.Container}>
                <ActivityIndicator size="large" color={Colors.themeColor} />
              </View>
            ) : (
              <ScrollView>
                {this.state.daysArray.map((item, i) => {
                  return (
                    <View style={styles.rowStyle} key={i}>
                      <View style={styles.dayView}>
                        <Text style={styles.dayTitle}>{item.dayName}</Text>
                      </View>

                      <View style={styles.switchContainer}>
                        <Switch
                          value={
                            this.state.days[`${item.shortName}Status`] === 1
                              ? true
                              : false
                          }
                          onValueChange={() => this.changeStatus(item)}
                          trackColor={{true: Colors.availability}}
                        />
                      </View>

                      <View style={styles.timeContainer}>
                        <TouchableOpacity
                          style={styles.row}
                          onPress={() =>
                            this.showTimePicker(item, 'starttime')
                          }>
                          <Icon name="time-outline" style={styles.iconStyle} />
                          <Text style={styles.time}>
                            {timeConversion(
                              this.state.days[`${item.shortName}TimingStart`],
                            )}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                      </View>

                      <View style={styles.timeContainer}>
                        <TouchableOpacity
                          style={styles.row}
                          onPress={() => this.showTimePicker(item, 'endtime')}>
                          <Icon name="time-outline" style={styles.iconStyle} />
                          <Text style={styles.time}>
                            {timeConversion(
                              this.state.days[`${item.shortName}TimingEnd`],
                            )}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                      </View>
                    </View>
                  );
                })}
                <Text style={styles.timeZone}>
                  The time will be according to your school time zone.
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.sessionUpdate();
                  }}>
                  <Text style={styles.buttonText}> Update </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
          {this.state.isTimePickerVisible && (
            <TimePicker
              cancelOnPress={() => {
                this.setState({
                  isTimePickerVisible: false,
                });
              }}
              confirmOnPress={() => {
                this.onConfirm();
              }}
              onChange={this.onChange}
              onChangeIos={this.onChangeIos}
              value={this.state.timeValue}
            />
          )}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 20,
    color: Colors.themeColor,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.LeagueSpartan,
  },
  iosTimerHeaderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  iosTimerConfirmButton: {
    color: Colors.themeColor,
  },
  rowStyle: {
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  dayView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dayTitle: {
    fontFamily: Fonts.OpenSansBold,
    marginLeft: 12,
    width: '100%',
  },
  time: {
    color: '#ccc',
    marginTop: 3,
    marginLeft: 2,
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  button: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themeColor,
    borderRadius: 5,
  },
  confirmButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeZone: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#c5c2c2',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
