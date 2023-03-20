import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLOURS} from '../../theme/paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  increaseCount,
  decreaseCount,
  removeFromCart,
  removeAllCart
} from '../../redux/slices/cartSlice';

export default function CartModal({
  modalVisible,
  setModalVisible,
  setSuccessModalVisible,
}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  console.log(cart.items)

  const totalCard = cart.items.reduce(
    (partialSum, a) => partialSum + a.count,
    0,
  );
  const totalPrice = cart.items.reduce(
    (partialSum, a) =>
      partialSum + a.count * Number(a.card.cardmarket.prices.averageSellPrice),
    0,
  );
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
        <ScrollView
          directionalLockEnabled={true}
          style={{width: '98%', borderRadius: 20, maxHeight: 500}}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {cart.items.map(item => (
              
                <View key={item.card.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 30,
                      marginHorizontal: 30,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                      
                        source={{uri: item.card.images.small}}
                        style={{
                          width: '33%',

                          height: 100,
                        }}
                        resizeMode="contain"
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: 10,
                          marginTop: 6,
                        }}>
                        <Text
                          style={{
                            ...styles.text2,
                          }}>
                          {item.card.name}
                        </Text>
                        <Text
                          style={{
                            color: COLOURS.primaryFontColor,
                            fontSize: 12,
                            marginTop: 2,
                          }}>
                          ${item.card.cardmarket.prices.averageSellPrice} per
                          card
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 22,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              ...styles.text1,
                            }}>
                            {item.card.set.total}
                          </Text>
                          <Text
                            style={{
                              color: COLOURS.secondaryFontColor,
                              fontSize: 12,
                              marginTop: 2,
                            }}>
                            cards left
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column', marginTop: 13}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: COLOURS.buttonColor,
                            fontWeight: '700',
                            fontSize: 16,
                          }}>
                          {item.count}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginTop: -10,
                            marginLeft: 3,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              if (item.count < item.card.set.total) {
                                dispatch(increaseCount(item.card.id));
                              }
                            }}>
                            <MaterialIcons
                              name="keyboard-arrow-up"
                              size={15}
                              style={{color: COLOURS.buttonColor}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (item.count === 1) {
                                dispatch(removeFromCart(item.card));
                              } else {
                                dispatch(decreaseCount(item.card.id));
                              }
                            }}>
                            <MaterialIcons
                              name="keyboard-arrow-down"
                              size={15}
                              style={{color: COLOURS.buttonColor}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: COLOURS.primaryFontColor,
                          marginLeft: -5,
                          marginTop: 13,
                        }}>
                        price
                      </Text>

                      <Text
                        style={{
                          fontSize: 16,
                          color: COLOURS.buttonColor,
                          fontWeight: '700',
                          marginTop: 5,
                          marginLeft: -13,
                        }}>
                        $
                        {(
                          Number(item.card.cardmarket.prices.averageSellPrice) *
                          item.count
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View
          style={{
            marginTop: 10,
            marginBottom: 30,
            marginHorizontal: 100,
          }}>
            <TouchableOpacity onPress={()=>dispatch(removeAllCart([]))}>
            <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 12, textDecorationLine: 'underline'}}>Clear All</Text>
            </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{}}>Total cards</Text>
            <Text style={{...styles.text1}}>{totalCard}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{...styles.text2}}>Total price </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#E84138',
                fontSize: 16,
                marginTop: 2,
                marginRight: 2,
                fontWeight: '700',
              }}>
              ${Number(totalPrice).toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLOURS.buttonColor,
            paddingHorizontal: 10,
            height: 34,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
            width: '60%',
          }}
          onPress={() => {
            setModalVisible(false);
            setSuccessModalVisible(true);
            dispatch(removeAllCart([]))
          }}>
          <Text style={{fontSize: 14, color: '#ffffff'}}>Pay now</Text>
        </TouchableOpacity>
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
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => setModalVisible(false)}>
          <Text style={{color: '#ffffff'}}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 100,
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
