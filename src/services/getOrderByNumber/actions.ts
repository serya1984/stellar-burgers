import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await api.getOrderByNumberApi(number);
    return response.orders[0];
  }
);
