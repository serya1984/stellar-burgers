import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';

export const registerUser = createAsyncThunk<
  api.TAuthResponse,
  api.TRegisterData
>(
  'user/Register',

  async (data) => api.registerUserApi(data)
);
