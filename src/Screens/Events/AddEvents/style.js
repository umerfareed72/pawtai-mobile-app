import {StyleSheet} from 'react-native';
import {Colors} from '../../../Theme';
import colors from '../../../Theme/Colors';
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWidth: {
    width: '47%',
  },
  inputText: {
    color: '#3C3C43',
    fontSize: 14,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxLeftStyle: {
    marginLeft: 1,
    width: 18,
    height: 18,
    marginRight: 10,
  },
  CheckBoxRightStyle: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  buttonContainer: {
    paddingHorizontal: WP('5'),
    paddingTop: 10,
  },

  titleInputDT: {
    marginBottom: 43,
    borderWidth: 1,
    borderRadius: 37,
    borderColor: '#3333334D',
    width: 74,
    margin: 12,
    paddingLeft: 12,
  },
  daysDT: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    borderColor: colors.input_light_gray,
    borderWidth: 1,
    marginVertical: 10,
  },
  pawtai: {
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    borderColor: colors.input_light_gray,
    borderWidth: 1,
  },
  days: {
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    borderColor: colors.input_light_gray,
    borderWidth: 1,
  },

  DateTime: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  weekContainer:{
    flexDirection:'row',width:'100%',flexWrap:'wrap',marginTop:20
  },
  weekDay:{
    width:'20%',padding:5
  },
  btnContainerWeek:{
padding:5,borderRadius:30,alignItems:'center',justifyContent:'center'
  },
});
