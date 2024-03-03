import React, {useEffect, useRef} from 'react';
import {Dimensions, KeyboardAvoidingView} from 'react-native';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {PROFILE_IMAGE_URL} from '../../Theme/routes';
import LikeCard from './LikeCard';
import ActionSheet from 'react-native-actions-sheet';
import colors from '../../Theme/Colors';

const LikeUserModal = ({show, onPressHide, user_lists, getValue}) => {
  const actionSheetRef = useRef();
  const scrollViewRef = useRef();
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
            {user_lists?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{marginVertical: 5}}
                 >
                  <LikeCard
                    // isImage={true}
                    // userImage={PROFILE_IMAGE_URL + item?.user?.image}
                    username={item?.user?.username}
                    firstLetter={item?.user?.username[0]}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ActionSheet>
  );
};

export default LikeUserModal;

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
