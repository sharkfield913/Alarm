/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AlarmApp = () => {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      console.log('Selected time:', selectedTime);
    } else {
      setShowTimePicker(true);
    }
  };

  const handleAddAlarm = () => {
    setShowTimePicker(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      if (
        time.getHours() === currentTime.getHours() &&
        time.getMinutes() === currentTime.getMinutes()
      ) {
        console.log('설정한 시간이 되었습니다');
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <View style={styles.container}>
      {/* Add Alarm Button */}
      <Button title="알람 추가" onPress={handleAddAlarm} />

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowTimePicker(false);
        }}>
        <View style={styles.modalContainer}>
          {showTimePicker && (
            <React.Fragment>
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={onTimeChange}
              />
            </React.Fragment>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AlarmApp;
