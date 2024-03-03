import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Theme';

const styles = StyleSheet.create({
  iosContainer: {
    flex: 1,
  },
  iosTimerHeaderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  confirmButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.themeColor,
  },
});

export default styles;
