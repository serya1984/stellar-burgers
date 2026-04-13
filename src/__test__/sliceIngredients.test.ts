import { ingridientsSlice } from '../services/ingridients/slices';
import { getIngredients } from '../services/ingridients/actions';
import { get } from 'http';

describe('тест редьюсера слайса ingridients', () => {
  const initialState = {
    ingridients: [],
    isLoading: false,
    error: null
  };
  it('тест установки isLoading=true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const store = ingridientsSlice.reducer(initialState, action);
    expect(store.isLoading).toBe(true);
    expect(store.error).toBeNull();
  });
  it('тест проверки записи ингредиентов store при getIngredients.fulfilled', () => {
    const ingredients = [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        name: 'Краторная булка N-200i',
        price: 1255,
        proteins: 80,
        type: 'bun',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093c'
      },
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Биокотлета из марсианской Магнолии',
        price: 424,
        proteins: 420,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0941'
      },
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e'
      }
    ];
    const action = { type: getIngredients.fulfilled.type, payload: ingredients};

    const store = ingridientsSlice.reducer(initialState, action);
    expect(store.isLoading).toBe(false);
    expect(store.ingridients).toEqual(ingredients);
  });
    it('тест проверки записи ошибки при getIngredients.rejected', () => {
        const errorMesage = 'Failed to load ingredients';
        const action = {type: getIngredients.rejected.type, error: { message: errorMesage}}; 
        const store = ingridientsSlice.reducer(initialState, action);
        expect(store.isLoading).toBe(false);
        expect(store.error).toBe(errorMesage);

    })
});
