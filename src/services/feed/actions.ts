import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsAll = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);
