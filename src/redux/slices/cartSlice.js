import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      state.items = [
        ...state.items.filter(item => item.card.id !== action.payload),
      ];
    },
    increaseCount: (state, action) => {
      let temp = state.items;
      const index = arr.findIndex(obj => {
        return obj.id === action.payload;
      });
      if (index !== -1) {
        temp[index].count = temp[index].count + 1;
      }
      state.items = [...temp];
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
