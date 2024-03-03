import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Theme';
import colors from '../../Theme/Colors';
import {WP} from '../../Theme/responsive';
export default StyleSheet.create({
  Container: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  contentContainer: {
    height: '87%',
    backgroundColor: Colors.white,
    paddingHorizontal: WP('5'),
    paddingTop: WP('2'),
  },
  textContainer: {
    height: Dimensions.get('screen').height / 4,
  },
  inputStyle: {
    fontSize: 18,
    color: Colors.light_Black,
  },
  btnContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    paddingHorizontal: WP('5'),
  },
  btnText: {
    backgroundColor: Colors.themeColor,
    padding: 10,
    borderRadius: 100,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  imageContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagebgStyle: {
    height: Dimensions.get('screen').height / 8,
    width: Dimensions.get('screen').width / 3.7,
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  mgStyle: {
    height: Dimensions.get('screen').height / 10,
    width: Dimensions.get('screen').width / 3.7,
    borderRadius: 12,
  },
  crossIcon: {
    height: 20,
    width: 20,
    borderRadius: 13,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -5,
    marginTop: -5,
  },
  icon: {
    fontSize: 15,
    color: 'white',
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
