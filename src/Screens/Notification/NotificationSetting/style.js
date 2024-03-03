import {StyleSheet} from 'react-native';
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
    paddingHorizontal: WP('5'),
    paddingTop:WP('2')
  
  },
});
