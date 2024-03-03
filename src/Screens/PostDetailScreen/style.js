import {Dimensions, Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import colors from '../../Theme/Colors';
import Colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: WP('5'),
    paddingTop: WP('3'),
  },
  headerText: {
    fontSize: WP('3.5'),
    color: colors.themeColor,
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.input_light_gray,
    marginBottom: Platform.OS == 'ios' ? 70 : 0,
    alignItems: 'center',
  },
  textBold: {
    fontSize: 16,
    color: colors.light_Black,
    fontWeight: 'bold',
  },
  textBoldContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    paddingVertical: 5,
    marginTop: 20,
  },
  outConatiner: {
    paddingTop: WP('4'),
    width: '100%',
  },

  textColor: {
    fontSize: 14,
    color: colors.input_Black,
    fontWeight: '500',
    width: '90%',
  },
  reverseCol: {
  
    flexGrow: 1,
    flexDirection: 'column-reverse',
  },
  imageBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.themeColor,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: colors.themeColor,
    padding: 4,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 12,
    color: colors.themeColor,
  },
  username: {
    color: colors.themeColor,
    fontWeight: 'bold',
  },
  mentionStyle: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.themeColor,
    backgroundColor: colors.white,
  },
  mentionText: {
    fontSize: 15,
  },
});
