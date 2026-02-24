import { FC, useEffect } from 'react';
import { getOrdersInfo } from '../../services/getOrders/slices';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../../src/services/store';
import { selectorFeed } from '../../../src/services/feed/slices';
import { getOrdersAction } from '../../../src/services/getOrders/actions';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const selector = useSelector(); /** TODO: взять переменные из стора */
  const dispatch = useDispatch();
  const feed = selector(selectorFeed);

  useEffect(() => {
    dispatch(getOrdersAction());
  }, [dispatch]);
  const orders = selector(getOrdersInfo);
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
