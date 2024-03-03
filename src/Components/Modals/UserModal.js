import React, {useEffect, useRef} from 'react';
import {Dimensions, KeyboardAvoidingView} from 'react-native';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {PROFILE_IMAGE_URL} from '../../Theme/routes';
import LikeCard from './LikeCard';
import ActionSheet from 'react-native-actions-sheet';
import colors from '../../Theme/Colors';

const UserModal = ({show, onPressHide, pawtai_List, getValue}) => {
  const actionSheetRef = useRef();
  const scrollViewRef = useRef();
  const StoreList = item => {
    if (getValue) {
      getValue(item);
    }
  };
  useEffect(() => {
    if (show) actionSheetRef?.current?.show();
  }, [show]);

  return (
    <ActionSheet
      gestureEnabled={true}
      closable={true}
      onClose={onPressHide}
      ref={actionSheetRef}
      containerStyle={styles.containerStyle}>
      <View style={styles.modalContainer}>
        <View style={styles.buttonContainer}>
          <ScrollView
            ref={scrollViewRef}
            nestedScrollEnabled={true}
            onScrollEndDrag={() =>
              actionSheetRef.current?.handleChildScrollEnd()
            }
            onScrollAnimationEnd={() =>
              actionSheetRef.current?.handleChildScrollEnd()
            }
            onMomentumScrollEnd={() =>
              actionSheetRef.current?.handleChildScrollEnd()
            }
            style={{marginBottom: 20}}
            showsVerticalScrollIndicator={false}>
            {pawtai_List?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{marginVertical: 5}}
                  onPress={() => StoreList(item)}>
                  <LikeCard
                    isImage={true}
                    userImage={PROFILE_IMAGE_URL + item?.image}
                    username={item?.name}
                    firstLetter={item?.name[0]}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ActionSheet>
  );
};

export default UserModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: Dimensions.get('screen').height / 1.15,
  },

  modalContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
