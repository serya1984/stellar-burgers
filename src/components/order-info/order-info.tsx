import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../../src/services/store';
import { getOrderData } from '../../../src/services/order/slices';
import { selectorIngridients } from '../../../src/services/ingridients/slices';
import { useParams } from 'react-router-dom';
import { selectOrderById } from '../../../src/services/feed/slices';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string | undefined }>();
  const selector = useSelector();
  const orderData =
    number === undefined
      ? selector(getOrderData)
      : selector(selectOrderById(number));
  const ingredients: TIngredient[] = selector(selectorIngridients);
  /** TODO: взять переменные orderData и ingredients из стора */
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
