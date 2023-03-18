import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, {card: action.payload, count: 1}];
    },
    removeFromCart: (state, action) => {
      state.items = [
        ...state.items.filter(item => item.card.id !== action.payload.id),
      ];
    },
    increaseCount: (state, action) => {
      let temp = state.items;
      const index = temp.findIndex(obj => {
        return obj.card.id === action.payload;
      });
      if (index !== -1) {
        temp[index].count = temp[index].count + 1;
      }
      state.items = [...temp];
    },
    decreaseCount: (state, action) => {
      let temp = state.items;
      const index = temp.findIndex(obj => {
        return obj.card.id === action.payload;
      });
      if (index !== -1) {
        temp[index].count = temp[index].count - 1;
      }
      state.items = [...temp];
    },
  },
});

export const {addToCart, removeFromCart, increaseCount, decreaseCount} =
  cartSlice.actions;

export default cartSlice.reducer;
