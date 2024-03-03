import React from 'react';
import { Dimensions } from 'react-native';
import {StyleSheet, Text, Image} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {Images} from '../../Theme';
import colors from '../../Theme/Colors';
import {DotsView, MenText} from './styles';

const ThreeDotsMenu = ({onPressEdit, onPressDelete}) => {
  return (
    <MenuProvider >
      <Menu opened={true}  >
        <MenuTrigger>
          <DotsView>
            <Image source={Images.Dots} />
          </DotsView>
        </MenuTrigger>
        <MenuOptions style={styles.menOpt}>
          <MenuOption style={styles.men} onSelect={onPressEdit}>
            <MenText>Edit Post</MenText>
          </MenuOption>
          <MenuOption style={styles.men} onSelect={onPressDelete}>
            <MenText>Delete Post</MenText>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};
export default ThreeDotsMenu;

const styles = StyleSheet.create({
  menOpt: {
    backgroundColor: colors.themeColor,
  },
  // men: {
  //   borderColor: 'rgba(0, 0, 0, 0.2)',
  //   borderBottomWidth: 1,
  //   paddingBottom: '8%',
  //   paddingTop: '8%',
  //   paddingLeft: '5%',
  // },
});
