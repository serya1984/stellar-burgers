import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectorOrders } from '../../../src/services/feed/slices';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getFeed } from '../../../src/services/feed/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const selector = useSelector();
  const dispatch = useDispatch();
  const orders: TOrder[] = selector(selectorOrders);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
