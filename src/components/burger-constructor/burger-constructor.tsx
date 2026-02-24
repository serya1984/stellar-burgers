import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  clearConstructor,
  getConstructorItems
} from '../../../src/services/constructorIngridients/constructorSlices';
import {
  getOrderData,
  getOrderRequest,
  resetOrderData
} from '../../../src/services/order/slices';
import { orderAction } from '../../../src/services/order/actions';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const selector = useSelector();
  const constructorItems = selector(getConstructorItems);
  const orderRequest = selector(getOrderRequest);
  const orderModalData = selector(getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(orderAction(ingredientIds));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(resetOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
