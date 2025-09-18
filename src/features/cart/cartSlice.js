import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product=action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if(existing){
        existing.quantity +=1;
      }else{
        state.items.push({...product, quantity:1})
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove product if qty reaches 0
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    emptyTheCart:(state,action)=>{
      state.items.length = 0;
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, emptyTheCart } = cartSlice.actions;

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
