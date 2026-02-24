import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export type ProfileState = {
  profile: TUser;
  isLoading?: boolean;
  error?: string | null;
};

const initialState: ProfileState = {
  profile: {
    id: '',
    name: '',
    email: ''
  },
  isLoading: false,
  error: null
};

export const ProfileUserSlice = createSlice({
  name: 'ProfileUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});
export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile.profile;

export default ProfileUserSlice.reducer;
