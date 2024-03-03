import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme';
import {WP} from '../../Theme/responsive';
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: WP('5'),
    paddingTop: WP('2'),
  },
  modalContainer: {
    flex: 1,
  },

  imageBg: {
    height: WP('150'),
    width: WP('100'),
    backgroundColor: 'transparent',
  },
  pageContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  imageStyling: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  icon80: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  touchContainer: {
    position: 'absolute',
    zIndex: 10000,
  },
  hitSlope: {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
  BtnStyling: {
    position: 'absolute',
  },
  separator: {
    borderWidth: 5,
    borderColor: Colors.light_Black,
  },
  Align:{
    justifyContent: 'center', alignItems: 'center'
  }
});
