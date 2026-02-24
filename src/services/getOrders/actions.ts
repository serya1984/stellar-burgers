import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersAction = createAsyncThunk('order/getOrder', async () => {
  const response = await getOrdersApi();
  return response;
});
