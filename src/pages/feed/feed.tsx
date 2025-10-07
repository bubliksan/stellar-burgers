import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedsAll,
  selectFeedSelector
} from '../../../src/services/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const feeds = useSelector(selectFeedSelector);
  const orders: TOrder[] = feeds.orders;
  const dispatch = useDispatch();

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsAll());
      }}
    />
  );
};
