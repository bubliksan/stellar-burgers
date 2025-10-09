import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { sendOrder } from './actions';

type TOrderState = {
  order: TOrder | null;
  name: string;
  loading: boolean;
};

const initialState: TOrderState = {
  order: null,
  name: '',
  loading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrder: (state) => {
      state.order = null;
      state.name = '';
      state.loading = false;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getStatus: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.loading = false;
      });
  }
});

export const { getOrder, getStatus } = orderSlice.selectors;
export const { deleteOrder } = orderSlice.actions;
