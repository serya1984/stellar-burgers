import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  TConstructorState
} from '../services/constructorIngridients/constructorSlices';

describe('тест редьюсера слайса burgerConstructor', () => {
  let initialState: TConstructorState = {
    items: {
      bun: null,
      ingredients: []
    }
  };

  beforeEach(() => {
    initialState = {
      items: {
        bun: null,
        ingredients: []
      }
    };
  });

  const ingredients = [
    {
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      name: 'Филе Люминесцентного тетраодонтимформа',
      price: 988,
      proteins: 44,
      type: 'main',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa093e'
    },
    {
      calories: 30,
      carbohydrates: 40,
      fat: 20,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      name: 'Соус Spicy-X',
      price: 90,
      proteins: 30,
      type: 'sauce',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0942'
    },
    {
      calories: 420,
      carbohydrates: 33,
      fat: 244,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      name: 'Мясо бессмертных моллюсков Protostomia',
      price: 1337,
      proteins: 433,
      type: 'main',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa093f'
    }
  ];

  const setupWithIngredients = () => {
    let state = constructorSlice(initialState, addIngredient(ingredients[0]));
    state = constructorSlice(state, addIngredient(ingredients[1]));
    state = constructorSlice(state, addIngredient(ingredients[2]));
    return state;
  }
  it('тест добавления игредиента', () => {
    const action = addIngredient(ingredients[0]);

    const result = constructorSlice(initialState, action);
    expect(result.items.ingredients).toEqual([
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
        _id: expect.any(String),
        id: expect.any(String)
      }
    ]);
  });
  it('тест изменения порядка инредиентов', () => {
      const stateWithItems = setupWithIngredients();

      const firstId = stateWithItems.items.ingredients[0].id;
      const secondId = stateWithItems.items.ingredients[1].id;

      const result = constructorSlice(stateWithItems, moveIngredient({fromIndex: 0, toIndex: 1}));
      
      expect(result.items.ingredients[0].id).toBe(secondId);
      expect(result.items.ingredients[1].id).toBe(firstId);
  });
  it('тест удаления ингредиента', () => {
    const stateWithitems = setupWithIngredients();

    const idToRemove = stateWithitems.items.ingredients[0].id

    const result = constructorSlice(stateWithitems, removeIngredient(idToRemove));

    expect(result.items.ingredients).toHaveLength(2);
    expect(result.items.ingredients.find(i => i._id === idToRemove)).toBeUndefined()
  });
});
