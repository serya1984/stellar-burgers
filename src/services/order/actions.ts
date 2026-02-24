import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderAction = createAsyncThunk(
  'order/create',
  async (orders: string[]) => {
    const response = await orderBurgerApi(orders);
    return response.order;
  }
);
