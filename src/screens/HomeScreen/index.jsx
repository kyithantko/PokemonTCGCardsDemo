import * as React from 'react';
import {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/slices/cartSlice';
import useCards from '../../hooks/useCards';

const HomeScreen = () => {
  const {data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
    useCards();

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {cart.items.map(item => (
          <View key={item.card.id}>
            <Button
              mode="contained-tonal"
              onPress={() => dispatch(removeFromCart(item.card.id))}>
              Remove {item.card.name} from cart count: {item.count}
            </Button>
          </View>
        ))}
        {status === 'loading' ? (
          <Text>Loading...</Text>
        ) : status === 'error' ? (
          <Text>Error: {error.message}</Text>
        ) : (
          data.pages.map((group, i) => (
            <View key={i}>
              {group.data.map(card => (
                <View key={card.id}>
                  <Button
                    mode="contained"
                    onPress={() => dispatch(addToCart({card, count: 1}))}>
                    Add {card.name} to cart
                  </Button>
                </View>
              ))}
            </View>
          ))
        )}
        <Button
          mode="outlined"
          loading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
          onPress={() => fetchNextPage()}>
          Load more cards
        </Button>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
