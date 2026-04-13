import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngridientState = {
  ingridients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngridientState = {
  ingridients: [],
  isLoading: false,
  error: null
};

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {
    addIngridients: (state, action: PayloadAction<TIngredient>) => {
      state.ingridients = [...state.ingridients, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingridients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load ingredients';
      });
  }
});

const selectIngredientsState = (state: { ingridients: TIngridientState }) =>
  state.ingridients;
const selectAllIngredients = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.ingridients
);
export const selectorBans = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'bun')
);
export const selectorMains = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'main')
);
export const selectorSauces = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'sauce')
);
export const selectIngredientById =
  (id: string | undefined) => (state: { ingridients: TIngridientState }) =>
    state.ingridients.ingridients.find((item) => item._id === id);
export const selectorIngridients = (state: { ingridients: TIngridientState }) =>
  state.ingridients.ingridients;
export const selectIsLoading = (state: { ingridients: TIngridientState }) =>
  state.ingridients.isLoading;
export const selectError = (state: { ingridients: TIngridientState }) =>
  state.ingridients.error;
