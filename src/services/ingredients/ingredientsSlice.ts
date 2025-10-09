import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsAll } from './actions';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAll.pending, (state) => {
        //console.log('Fetching ingredients...'); //Убрать
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getIngredientsAll.rejected, (state, action) => {
        //console.log('Ingredients rejected!'); //Убрать
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsAll.fulfilled, (state, action) => {
        //console.log('Ingredients fetched:', action.payload); //Убрать
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredientsSelector } = ingredientsSlice.selectors;
