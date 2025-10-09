import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersFeed } from '../../services/orders/ordersSlice';
import { getOrders } from '../../services/orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orders: TOrder[] = useSelector(getOrdersFeed);
  return <ProfileOrdersUI orders={orders} />;
};
