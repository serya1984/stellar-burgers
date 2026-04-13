import { rootReducer } from '../services/store';

describe('инициализация rootReducer', () => {
  it('тест возврата начального состояния rootReducer', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toBeDefined();
  });
});
