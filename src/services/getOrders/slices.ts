import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersAction } from './actions';

type GetOrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: GetOrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrderSlice = createSlice({
  name: 'getOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load orders';
      });
  }
});

export const getOrdersInfo = (state: { getOrders: GetOrderState }) =>
  state.getOrders.orders;
