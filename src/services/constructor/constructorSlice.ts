import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor/slice',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type == 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid(5);
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const [item] = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload - 1, 0, item);
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const [item] = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload + 1, 0, item);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { getConstructor } = constructorSlice.selectors;
export const {
  addIngredient,
  clearConstructor,
  deleteIngredient,
  upIngredient,
  downIngredient
} = constructorSlice.actions;
