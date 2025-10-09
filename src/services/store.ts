import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/ingredientsSlice';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { feedSlice } from './feed/feedSlice';
import { userSlice } from './user/userSlice';
import { constructorSlice } from './constructor/constructorSlice';
import { orderSlice } from './order/orderSlice';
import { ordersSlice } from './orders/ordersSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  userSlice,
  constructorSlice,
  orderSlice,
  ordersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
