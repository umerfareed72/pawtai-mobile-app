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
    paddingTop: WP('2'),
  },
  cardSeparator: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#707070',
  },
  cardContainer: {
    padding: WP('2'),
    

  },
  readAllBtn:{
    padding:10,width:'100%',alignItems:'flex-end',justifyContent:'center'
  },
  readtext:{
    color:Colors.themeColor,fontWeight:'bold'
  }
});
