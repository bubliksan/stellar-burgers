import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsAll } from './actions';

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
export { getFeedsAll };
