import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderAction } from './actions';
import { useDispatch } from '../store';
import { clearConstructor } from '../constructorIngridients/constructorSlices';

export type TOrderState = {
  orderData: TOrder | null;
  request: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderData: null,
  request: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrderData: (state) => {
      state.orderData = null;
      state.request = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderAction.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(orderAction.fulfilled, (state, action) => {
        state.request = false;
        state.orderData = action.payload;
      })
      .addCase(orderAction.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message || 'Failed to create order';
      });
  }
});

export const { setOrder, resetOrderData } = orderSlice.actions;

export const getOrderRequest = (state: { order: TOrderState }) =>
  state.order.request;
export const getOrderData = (state: { order: TOrderState }) =>
  state.order.orderData;
export const getOrderError = (state: { order: TOrderState }) =>
  state.order.error;
export const getOrderNumber = (state: { order: TOrderState }) =>
  state.order.orderData?.number;

export default orderSlice.reducer;
