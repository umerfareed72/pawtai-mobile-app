import {Colors, Fonts} from '../../../Theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  constainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },

  descriptionContainer: {
    marginVertical: 20,
  },
  marginVertical_10: {
    marginVertical: 20,
  },

  viewStyle: {
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
  },
  customStyleProp: {
    marginTop: 5,
    backgroundColor: Colors.themeColor,
    height: 36,
    alignSelf: 'center',
    width: '80%',
  },
  iconstyle: {
    fontSize: 20,
    color: Colors.themeColor,
    alignSelf: 'center',
    marginTop: 2,
    marginLeft: 4,
    marginRight: 3,
  },
  welcome: {
    fontSize: 17,
    color: Colors.themeGreyNew,
    textAlign: 'center',
    fontFamily: Fonts.LeagueSpartan,
  },
  imagestyle: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  boxview: {
    padding: 8,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
  },

  textStyle: {
    fontSize: 35,
    fontWeight: '600',
    color: '#5c5c5c',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: Fonts.LeagueSpartan,
  },
  modalSelectStudentContaienr: {
    width: '80%',
    alignSelf: 'center',
  },
  modalSelectStudentText: {
    fontFamily: 'Open Sans',
    alignSelf: 'center',
    color: '#7d7d7d',
    fontWeight: '300',
  },

  viewContainerReason: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.seprator,
    marginVertical: 5,
  },

  repeatText: {
    alignSelf: 'center',
    fontFamily: 'Open Sans',
    color: '#7d7d7d',
    fontWeight: '500',
  },
  viewContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxText: {
    fontFamily: Fonts.OpenSansBold,
    paddingLeft: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  ButtonContainer: {
    marginTop: 10,
  },
  timeText: {
    color: '#ccc',
    alignSelf: 'flex-start',
  },

  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.seprator,
    marginVertical: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },

  rowIcon: {
    height: 18,
    width: 18,
  },

  rowLabel: {
    color: Colors.themeColor,
    marginLeft: 5,
    width: '30%',
    alignSelf: 'center',
    fontSize: 15,
  },

  rowIconReason: {
    resizeMode: 'cover',
    alignSelf: 'center',
    height: 22,
    width: 18,
  },

  dateTimePickerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },

  pickerStyle: {
    color: '#7d7d7d',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    width: '75%',
    alignSelf: 'center',
  },
});

export default styles;
