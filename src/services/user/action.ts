import { deleteCookie, setCookie } from '../../../src/utils/cookie';
import * as api from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setIsAuthChecked, userLogout } from '../user/slice';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: api.TLoginData, { rejectWithValue }) => {
    const data = await api.loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', (_, { dispatch }) => {
  api
    .logoutApi()
    .then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

export const setUser = createAction<TUser | null, 'user/setUser'>(
  'user/setUser'
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (api.isTokenExists) {
      api
        .getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
