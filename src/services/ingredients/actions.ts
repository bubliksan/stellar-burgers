import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredientsAll = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);
