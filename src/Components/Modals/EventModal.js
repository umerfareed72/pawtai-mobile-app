import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../Theme/Colors';
import Card from '../Dashboard/Card';
import Loader from '../../Components/Loader/Loader';

const EventModal = ({show, onPressHide, date, eventList, loading}) => {
  return (
    <View style={styles.container}>
      <Modal onBackdropPress={onPressHide} isVisible={show}>
        <View style={styles.modalContainer}>
          <View style={{paddingVertical: 10}}>
            <Text style={styles.textStyle}>{date}</Text>
          </View>
          {!loading ? (
            <FlatList
            showsVerticalScrollIndicator={false}
              data={eventList}
              renderItem={({item, index}) => {
                return (
                  <Card
                    showEmoji={true}
                    ispadding={true}
                    title={item?.title}
                    disableCardPress={true}
                    date={ 
                      'Start Time: '+
                     moment(item?.start_date).format('DD-MM-YYYY') +
                      ' - ' +
                      item.start_time_format              
                    }
                    end_Date={ 
                      'End Time:   '+
                     moment(item?.end_date).format('DD-MM-YYYY') +
                      ' - ' +
                      item.end_time_format              
                    }
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{marginTop: 50, marginBottom: 50}}>
              <Loader />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default EventModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.themeColor,
  },
});
