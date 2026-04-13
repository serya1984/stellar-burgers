import { TUser } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { login, logout, setUser } from '../user/action';
import { updateUserProfile } from '../profile/action';

type UserState = {
  user: TUser | null;
  error: string | null;
  isAuthChecked: boolean;
};

export const initialState: UserState = {
  user: null,
  error: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      });
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка получения данных пользователя';
      });
  }
});

export const { selectUser, selectIsAuthChecked, selectError } =
  userSlice.selectors;
export const { setIsAuthChecked, userLogout } = userSlice.actions;
