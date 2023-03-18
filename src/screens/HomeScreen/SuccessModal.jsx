import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {COLOURS} from '../../theme/paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SuccessModal({modalVisible, setModalVisible}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}>
        <View
          directionalLockEnabled={true}
          style={{width: '98%', borderRadius: 20}}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 100,
                  paddingBottom: 30,
                }}>
                <AntDesign
                  name="checkcircle"
                  size={100}
                  style={{marginRight: 3, color: '#80DB5F'}}
                />
                <Text
                  style={{
                    color: COLOURS.primaryFontColor,
                    fontSize: 18,
                    width: 200,
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  Payment Success!
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E84138',
                    paddingHorizontal: 10,
                    height: 25,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginTop: 35,
                  }}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{color: '#ffffff'}}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text1: {
    color: '#E84138',
    fontSize: 14,
    marginTop: 2,
    marginRight: 2,
    fontWeight: '700',
  },
  text2: {
    color: COLOURS.primaryFontColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
