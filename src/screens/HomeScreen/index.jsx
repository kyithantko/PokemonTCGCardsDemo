import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Appbar, TextInput, Button, Badge} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLOURS} from '../../theme/paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/slices/cartSlice';
import useCards from '../../hooks/useCards';
import useRarities from '../../hooks/useRarities';
import useTypes from '../../hooks/useTypes';
import CartModal from './CartModal';
import SuccessModal from './SuccessModal';

export default function HomeScreen({navigation}) {
  const [openType, setOpenType] = useState(false);
  const [openRarity, setOpenRarity] = useState(false);
  const [openSet, setOpenSet] = useState(false);
  const [type, setType] = useState(null);
  const [rarity, setRarity] = useState(null);
  const [set, setSet] = useState(null);
  const [name, setName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const {data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
    useCards();
  const {data: rarities, isLoading: raritiesLoading} = useRarities();
  const {data: types, isLoading: typesLoading} = useTypes();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const categoryList = [
    {
      label: 'style A',
      value: 1,
    },
    {
      label: 'style B',
      value: 2,
    },
    {
      label: 'style C',
      value: 3,
    },
    {
      label: 'style D',
      value: 4,
    },
  ];

  return (
    <>
      <Appbar>
        <Appbar.Content title="TCG Marketplace" />
        <Image
          source={require('../../assets/images/pokemon_logo.webp')}
          style={{width: '40%'}}
          resizeMode="contain"
        />
      </Appbar>
      <ScrollView style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <CartModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setSuccessModalVisible={setSuccessModalVisible}
        />
        <SuccessModal
          modalVisible={successModalVisible}
          setModalVisible={setSuccessModalVisible}
        />
        {status === 'loading' ? (
          <View style={{marginTop: 20}}>
            <ActivityIndicator animating={true} />
          </View>
        ) : status === 'error' ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <TextInput
                label={
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#D7D7D7',
                    }}>
                    Name
                  </Text>
                }
                underlineColor="transparent"
                style={{
                  width: '85%',
                  backgroundColor: '#ffffff',
                  fontWeight: '700',
                  borderRadius: 20,
                }}
                theme={{roundness: 20}}
                value={name}
                onChangeText={value => setName(value)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-around',
                marginHorizontal: 10,
                zIndex: 100,
              }}>
              <DropDownPicker
                open={openType}
                value={type}
                items={
                  typesLoading
                    ? []
                    : types.data.map(type => ({label: type, value: type}))
                }
                placeholder="Type"
                setOpen={setOpenType}
                setValue={setType}
                // setItems={setItems}
                style={{
                  zIndex: 10,
                  borderRadius: 10,
                  borderColor: '#ffffff',
                }}
                listMode="SCROLLVIEW"
                zIndex={10}
                textStyle={{
                  color: '#A5A5A5',
                  fontSize: 12,
                  fontWeight: '400',
                }}
                containerStyle={{
                  width: '25%',
                }}
                dropDownContainerStyle={{
                  borderColor: '#ffffff',
                }}
              />
              <DropDownPicker
                open={openRarity}
                value={rarity}
                items={
                  raritiesLoading
                    ? []
                    : rarities.data.map(rarity => ({
                        label: rarity,
                        value: rarity,
                      }))
                }
                placeholder="Rarity"
                setOpen={setOpenRarity}
                setValue={setRarity}
                style={{
                  zIndex: 10,
                  borderRadius: 10,
                  borderColor: '#ffffff',
                }}
                listMode="SCROLLVIEW"
                zIndex={10}
                textStyle={{
                  color: '#A5A5A5',

                  fontSize: 12,
                  fontWeight: '400',
                }}
                containerStyle={{
                  width: '25%',
                  borderColor: '#ffffff',
                }}
                dropDownContainerStyle={{
                  borderColor: '#ffffff',
                }}
              />
              <DropDownPicker
                open={openSet}
                value={set}
                items={categoryList}
                placeholder="Set"
                setOpen={setOpenSet}
                setValue={setSet}
                // setItems={setItems}
                style={{
                  zIndex: 10,
                  borderRadius: 10,
                  borderColor: '#ffffff',
                }}
                listMode="SCROLLVIEW"
                zIndex={10}
                textStyle={{
                  color: '#A5A5A5',

                  fontSize: 12,
                  fontWeight: '400',
                }}
                containerStyle={{
                  width: '25%',
                  borderColor: '#ffffff',
                }}
                dropDownContainerStyle={{
                  borderColor: '#ffffff',
                }}
              />
            </View>
            {data.pages.map((group, i) => (
              <View key={i}>
                {group.data.map(card => {
                  const isInCart = cart.items.find(
                    item => item.card.id === card.id,
                  );
                  return (
                    <View
                      key={card.id}
                      style={{
                        alignItems: 'center',
                        marginTop: 30,
                        zIndex: -10,
                      }}>
                      <Image
                        source={{uri: card.images.small}}
                        style={{width: '50%', height: 280, zIndex: -1}}
                        resizeMode="contain"
                      />
                      <View
                        style={{
                          backgroundColor: '#ffffff',
                          width: '70%',
                          borderWidth: 1,
                          borderColor: '#ffffff',
                          borderRadius: 10,
                          paddingBottom: 30,
                          paddingTop: 80,
                          marginTop: -80,
                          zIndex: -5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLOURS.primaryFontColor,
                            fontWeight: 'bold',
                            fontSize: 24,
                            //   marginTop: 40,
                          }}>
                          {card.name}
                        </Text>
                        <Text
                          style={{
                            color: '#4D82B8',
                            fontSize: 14,
                            marginTop: 5,
                          }}>
                          {card.rarity}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 8,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              marginRight: 7,
                              color: '#6A6969',
                            }}>
                            ${card.cardmarket.prices.averageSellPrice}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              marginLeft: 7,
                              color: '#6A6969',
                            }}>
                            {card.set.total} left
                          </Text>
                        </View>
                      </View>
                      <Button
                        onPress={() => {
                          if (card.set.total > 0) {
                            if (isInCart) {
                              dispatch(removeFromCart(card));
                            } else {
                              dispatch(addToCart(card));
                            }
                          }
                        }}
                        disabled={card.set.total < 0}
                        mode="contained"
                        labelStyle={{
                          color: isInCart
                            ? '#FFFFFF'
                            : COLOURS.primaryFontColor,
                          fontSize: 16,
                        }}
                        uppercase={false}
                        style={{
                          width: 169,
                          height: 40,
                          borderRadius: 20,
                          alignSelf: 'center',
                          backgroundColor: isInCart ? '#1D1C1C' : '#F6D050',
                          color: isInCart ? '#FFFFFF' : '#1B1A1A',
                          marginTop: -20,
                        }}>
                        {isInCart ? 'Selected' : 'Select card'}
                      </Button>
                    </View>
                  );
                })}
              </View>
            ))}
            <View style={{marginTop: 10, marginBottom: 90}}>
              <Button
                onPress={() => fetchNextPage()}
                loading={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}>
                <AntDesign name="search1" size={20} />
                &nbsp;&nbsp;show more
              </Button>
            </View>
          </>
        )}
      </ScrollView>
      {!modalVisible && (
        <TouchableOpacity
          style={{
            backgroundColor: COLOURS.buttonColor,
            paddingHorizontal: 10,
            height: 34,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
            position: 'absolute',
            bottom: 0,
            marginTop: 10,
            marginBottom: 30,
          }}
          onPress={() => setModalVisible(true)}>
          {cart.items.length !== 0 && (
            <Badge
              style={{
                backgroundColor: '#E84138',
                top: -5,
                left: -10,
                position: 'absolute',
              }}>
              {cart.items.length}
            </Badge>
          )}
          <AntDesign
            name="shoppingcart"
            size={22}
            style={{marginRight: 3, color: '#ffffff'}}
          />
          <Text style={{fontSize: 14, color: '#ffffff'}}>View cart</Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity
        style={{
          backgroundColor: '#4789F5',
          paddingHorizontal: 10,
          height: 34,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
          position: 'absolute',
          bottom: 0,
          marginTop: 10,
          marginBottom: 30,
        }}>
        <AntDesign
          name="shoppingcart"
          size={22}
          style={{marginRight: 3, color: '#ffffff'}}
        />
        <Text style={{fontSize: 14, color: '#ffffff'}}>View cart</Text>
      </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginBottom: 50,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 500,

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
