import { TUser } from '@utils-types';
import { registerUser } from './action';
import { createSlice } from '@reduxjs/toolkit';

type RegisterState = {
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: RegisterState = {
  user: null,
  error: null,
  isLoading: false
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to register';
      });
  }
});
