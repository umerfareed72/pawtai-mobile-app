import React from 'react';
import {Text, TouchableOpacity, Picker} from 'react-native';

import ModalOption from '../../Global/ModalOption';
import {Colors, Constants, Fonts, Images} from '../../../Theme/';

const ImageButton = ({...props}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [TextLabel, setTextLabel] = React.useState('Select Value');

  React.useEffect(() => {
    props.options.forEach(element => {
      if (props.selectedValue === element.value) {
        setTextLabel(element.label);
      }
    });
  }, [props]);

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={styles.TextLabel}>
          {TextLabel}
          {Constants.FONT_TEXT}
        </Text>
      </TouchableOpacity>

      {/* picker selecter modal*/}
      <ModalOption
        animationType="slide"
        transparent={false}
        style={styles.flex1}
        visible={showModal}
        onClosePress={() => setShowModal(false)}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={props.selectedValue}
          itemTextStyle={{fontFamily: 'Open Sans'}}
          onValueChange={props.onValueChange}>
          {props.options.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label} value={item.value} />
            );
          })}
        </Picker>
      </ModalOption>
    </>
  );
};

export default ImageButton;

const styles = {
  flex1: {
    flex: 1,
  },

  buttonText: {
    color: 'white',
    fontSize: 13,
    alignSelf: 'center',
    fontFamily: Fonts.LeagueSpartan,
  },
  TextLabel: {
    alignSelf: 'center',
    color: '#7d7d7d',
    fontWeight: '500',
    fontSize: 13,
    fontFamily: Fonts.OpenSansBold,
    paddingLeft: 5,
  },

  pickerStyle: {
    color: '#7d7d7d',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    width: '75%',
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
};
