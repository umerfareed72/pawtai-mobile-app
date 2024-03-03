import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import images from '../../Theme/Images';

const EventHeader = ({title, onPress, isImage}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <View>
        {isImage && (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={images.addBtn}
              style={{height: 27, width: 27, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
};

export default EventHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical:5
  },
  textStyle: {
    color: '#7DE2BB',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
