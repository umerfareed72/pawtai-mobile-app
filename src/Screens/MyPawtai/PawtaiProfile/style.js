import {StyleSheet, Dimensions} from 'react-native';
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
  mainImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height: 150,
    width: 150,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  btnContainer: {
    backgroundColor: Colors.themeColor,
    padding: 7,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  icon15: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  textMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {width: '50%'},
});
