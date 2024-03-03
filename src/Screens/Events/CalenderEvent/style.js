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
    paddingTop: WP('2'),
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  segmentContainer: {
    backgroundColor: Colors.white,
  },
  segment: {
    borderColor: Colors.themeColor,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 15,
  },
  hitSlope: {
    top: 30,
    bottom: 50,
  },
  loadMoreBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});
