import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './actions';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
  }
});

export const { getOrdersFeed } = ordersSlice.selectors;
