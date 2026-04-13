import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';

export const getUserProfile = createAsyncThunk<api.TUserResponse>(
  'user/getUserProfile',
  async () => api.getUserApi()
);

export const updateUserProfile = createAsyncThunk<
  api.TUserResponse,
  api.TRegisterData
>('user/updateUserProfile', async (data) => api.updateUserApi(data));
