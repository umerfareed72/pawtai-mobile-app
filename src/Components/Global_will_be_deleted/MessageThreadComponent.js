import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
} from "react-native";

import PictureDownloadChat from "../../../src/components/common/PictureDownloadChat";
import moment from 'moment/min/moment-with-locales'

import {Colors, Constants,Images,Fonts,} from "../../Theme/"

class MessageScreenComponent extends Component {

    constructor(props) {
        super(props);
    }

    time = {
        time: '',
        date: '',
        show: '',
        render: 0,
        name: '',
        userid: 0,
        temp: '',
        temp2: '',
    };

    
    // Don't know the reason behind this that's why using this previous developer code as it is.
    returnDate(date, time) {
        let d = date.split('-');
        this.time.temp = d;
        
        let day = new Date().getDate();
        let yesterday = (parseInt(day) - 1)

        if (d[0] == day) {
            if (time[0] >= 12) {
                let timeShow = parseInt(time[0]) - 12;
                timeShow = timeShow + "";
                if (timeShow.length == 1) {
                    timeShow = "0" + timeShow;
                }
                if (timeShow == "00") {
                    timeShow = "12"
                }
                this.time.show = timeShow + ":" + time[1] + " PM";

            }
            else {
                let timeShow = parseInt(time[0])
                timeShow = timeShow + "";
                if (timeShow.length == 1) {
                    timeShow = "0" + timeShow;
                }
                if (timeShow == "00") {
                    timeShow = "12"
                }
                this.time.show = timeShow + ":" + time[1] + " AM";
            }
        }
        else if (parseInt(d[0]) === yesterday ) {
            this.time.show = "Yesterday"
        }
        else {
            let temp = this.props.dateTime.split(' ');
            this.time.time = temp[1];
            this.time.time = this.time.time.split(':');
            this.time.date = moment(temp[0] + " " + this.time.time[0] + ":" + this.time.time[1], 'YYYY-MM-DD HH:mm').utc(temp[0] + " " + this.time.time[0] + ":" + this.time.time[1]).local().format("MM-DD-YYYY hh:mm A");
            this.time.show = this.time.date
        }

    }
    
    render() {
        let {state,props} =this
        let dateTime = this.props.dateTime.split(' ');

        let time= dateTime[1];
        time= time.split(':');

        let timestring = dateTime[0] + " " + time[0] + ":" + time[1];
        timestring = timestring.toString();

        let date = moment(timestring, 'YYYY-MM-DD HH:mm').utc(timestring);
        date = date.local().format("DD-MM-YYYY HH:mm");

        dateTime = date.split(' ');
        date = dateTime[0];
        time= dateTime[1];
        time= time.split(':');
        this.returnDate(date, time) 


        return (
            <View style={{...styles.threadContainer,opacity: props.isDeleted == 2 ? 0.6 : 1 }}>

                { 
                    (props.imagename == "" || props.anonimity === 1) ?
                        <ImageBackground style={styles.userImageBackground} source={Images.ProfileBackground}>
                            <Text style={styles.imageText}> {props.firstname.charAt(0)}</Text>
                        </ImageBackground>
                        :
                        <PictureDownloadChat 
                            key={props.keyVal} 
                            imagename={props.imagename} 
                            showbigs={true} 
                            token={props.token} 
                            userid={props.imgval} 
                            firstname={props.firstname} 
                            namet={''} 
                        />
                }

                <View style={styles.threadDataContainer}>
                    <View style={styles.flexRow}>
                        <Text numberOfLines={1} style={styles.usernameText}>{props.username}</Text>
                        { (props.unread != 0) &&  <View style={styles.unreadIndicator}/> }
                    </View>
                    <View style={styles.messageTextContainer}>
                        <Text numberOfLines={1} style={styles.messageText}>{props.message}</Text>
                    </View>
                </View>
                
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{this.time.show}</Text>
                    <Image source={Images.MessageArrow} style={styles.forwardImage} />
                </View>

            </View>
        );
    }
}

export default MessageScreenComponent;

const styles = StyleSheet.create({
  threadContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 3,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.SepratorLine,
    backgroundColor: Colors.white,
  },

  userImageBackground: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },

  imageText: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    paddingRight: 5,
  },

  threadDataContainer: {
    marginLeft: 10,
    paddingTop: 8,
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 4,
  },

  flexRow: {
    flexDirection: 'row',
  },

  dateContainer: {
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  unreadIndicator: {
    zIndex: 10,
    height: 8,
    width: 8,
    marginTop: 6,
    marginLeft: 3,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  usernameText: {
    fontSize: 15,
    color: Colors.themeGreyNew,
    fontFamily: Fonts.OpenSansBold,
  },

  messageTextContainer: {
    flexDirection: 'row',
    width: 250,
  },

  messageText: {
    color: Colors.themeGreyText,
    fontSize: 13,
    fontFamily: Fonts.OpenSans,
  },

  dateText: {
    zIndex: 0,
    margin: 3,
    fontFamily: Fonts.OpenSans,
    color: Colors.themeGreyText,
  },

 
  forwardImage: {
    margin: 3,
    width: 20,
    height: 20,
    alignSelf: 'stretch',
  },
});