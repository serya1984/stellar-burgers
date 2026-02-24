import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getOrdersInfo } from '../../../src/services/getOrders/slices';
import { getOrdersAction } from '../../../src/services/getOrders/actions';

export const ProfileOrders: FC = () => {
  const selector = useSelector();
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = selector(getOrdersInfo);
  useEffect(() => {
    dispatch(getOrdersAction());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
