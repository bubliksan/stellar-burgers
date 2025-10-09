import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);
