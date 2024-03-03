import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.black,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  imageStyle: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    left: 20,
    tintColor: colors.white,
  },
  imageBg: {
    height: WP('200'),
    width: WP('100'),
  },
});

export default styles;
