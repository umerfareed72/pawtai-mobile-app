import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../../../Theme';
import {WP} from '../../../Theme/responsive';
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: WP('2'),
    paddingHorizontal: WP('5'),
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 37,
    borderColor: Colors.input_light_gray,
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  save: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    paddingVertical: 20,
    margin: 20,
    backgroundColor: Colors.themeColor,
    shadowColor: Colors.shawdow_theme_color,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 4,
    shadowRadius: 4.65,

    elevation: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 37,
    borderColor: Colors.input_light_gray,
    paddingVertical: Platform.OS == 'android' ? 5 : 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  error: {
    paddingLeft: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
