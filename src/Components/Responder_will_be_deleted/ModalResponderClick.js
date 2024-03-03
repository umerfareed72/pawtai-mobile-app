

import React, { memo } from 'react';import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    TouchableHighlight,
    Dimensions
} from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Colors, Fonts } from '../..//Theme/';
import {TextButton} from '../../Components/Global/'

const SessionDetail = ({children, ...props}) => (
  <>
    <Modal
      {...props}
      animationType="fade"
      transparent={true}
      style={styles.flex_1}>
      <View style={styles.modalMainContainer}>

        <View style={styles.flex_1}>
          <TouchableWithoutFeedback onPress={props.onClosePress}>
            <View style={styles.flex_1} />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.modalContainer}>

          {props.image ? props.image : null}

          <Text style={styles.usernameText}>{props.username}</Text>
          <Text style={styles.userPositionText}>{props.userPosition}</Text>

          <TouchableHighlight underlayColor={Colors.HighLight} onPress={props.onMessageButtonPress} >
            <View style={styles.lebelContainer}>
              <TextButton buttonText="Send Message" textColor={Colors.themeColor} />
            </View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight underlayColor={Colors.HighLight} onPress={props.onClosePress} >
          <View style={styles.cancelContainer}>
            <TextButton buttonText="Cancel" textColor={Colors.warningColor} />
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  </>
);
export default SessionDetail;

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },

  modalMainContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingLeft: 14,
    paddingRight: 14,
  },

  modalContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 0,
    width: '100%',
  },

  usernameText: {
    fontFamily: Fonts.LeagueSpartan,
    color: Colors.themeGreyNew,
    fontSize: 17,
    alignSelf: 'center',
    marginTop:10,
  },

  userPositionText: {
    fontFamily: Fonts.OpenSans,
    color: Colors.themeGreyText,
    fontSize: 17,
    fontWeight: '300',
    alignSelf: 'center',
    marginBottom:10,
  },

  lebelContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: Colors.seprator,
  },

  cancelContainer: {
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginBottom: 20,
  },

});
