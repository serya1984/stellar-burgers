import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingridients/getIngredients',
  async () => api.getIngredientsApi()
);
