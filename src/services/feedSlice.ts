import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';

type feedState = {
  feeds: TOrdersData;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: feedState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: undefined
};

export const getFeedsAll = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedSelector: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAll.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getFeedsAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
      });
  }
});

export const { selectFeedSelector } = feedSlice.selectors;
