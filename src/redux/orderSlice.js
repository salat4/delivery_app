import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    products: [],
  },
  reducers: {
    addToOrder: (state, action) => {
      state.products.push(action.payload);
    },
    setAmount: (state, action) => {
      state.products.find(
        (element) => element.id === action.payload.id
      ).amount = action.payload.amount;
    },
    resetOrder: (state) => {
      state.products = [];
    },
  },
});

export const { addToOrder, setAmount, resetOrder } = orderSlice.actions;
