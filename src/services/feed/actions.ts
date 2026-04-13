import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';
import { TFeed } from '@utils-types';

export const getFeed = createAsyncThunk<TFeed>('feed/getFeed', async () =>
  api.getFeedsApi()
);
