import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  items: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  items: {
    ingredients: [],
    bun: null
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.items.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.items.ingredients = [...state.items.ingredients, action.payload];
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: `${ingredient._id}-${Date.now()}`
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.items.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.items.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.items = initialState.items;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export const getConstructorItems = (state: { items: TConstructorState }) =>
  state.items.items;

export default constructorSlice.reducer;
