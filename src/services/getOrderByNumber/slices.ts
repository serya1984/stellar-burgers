import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber } from './actions';
import { TOrderState } from '../order/slices';

const initialState: TOrderState = {
  orderData: null,
  request: false,
  error: null
};

export const getOrderByNumberSlice = createSlice({
  name: 'getOrderByNumber',
  initialState,
  reducers: {
    resetOrderByNumberData: (state) => {
      state.orderData = null;
      state.request = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.request = false;
          state.orderData = action.payload;
        }
      )
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message || 'Failed to load order';
      });
  }
});

export const { resetOrderByNumberData } = getOrderByNumberSlice.actions;
export const orderByNumber = (state: { order: TOrderState }) => {
  state.order.orderData;
};
export default getOrderByNumberSlice.reducer;
