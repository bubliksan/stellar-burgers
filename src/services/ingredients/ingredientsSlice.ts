import { createSlice } from '@reduxjs/toolkit';
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
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getIngredientsAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredientsSelector } = ingredientsSlice.selectors;
