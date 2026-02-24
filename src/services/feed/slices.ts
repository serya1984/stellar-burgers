import { createSlice } from '@reduxjs/toolkit';
import { TFeed } from '@utils-types';
import { getFeed } from './actions';

type TFeedState = {
  feed: TFeed;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load ingredients';
      });
  }
});

export const selectorOrders = (state: { feed: TFeedState }) =>
  state.feed.feed.orders;
export const selectorFeed = (state: { feed: TFeedState }) => state.feed.feed;
export const selectIsLoading = (state: { feed: TFeedState }) =>
  state.feed.isLoading;
export const selectOrderById =
  (id: string | undefined) => (state: { feed: TFeedState }) =>
    state.feed.feed.orders.find((item) => item.number === Number(id));
export const selectError = (state: { feed: TFeedState }) => state.feed.error;
