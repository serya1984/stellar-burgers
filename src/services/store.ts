import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientsSlice } from './ingridients/slices';
import { feedSlice } from './feed/slices';
import { constructorSlice } from './constructorIngridients/constructorSlices';
import { orderSlice } from './order/slices';
import { userSlice } from './user/slice';
import { registerSlice } from './registrer/slice';
import { ProfileUserSlice } from './profile/slice';
import { getOrderSlice } from './getOrders/slices';
import { getOrderByNumberSlice } from './getOrderByNumber/slices';

const rootReducer = combineSlices({
  ingridients: ingridientsSlice.reducer,
  items: constructorSlice.reducer,
  feed: feedSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer,
  register: registerSlice.reducer,
  profile: ProfileUserSlice.reducer,
  getOrders: getOrderSlice.reducer,
  getOrderByNumber: getOrderByNumberSlice.reducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>;

export default store;
