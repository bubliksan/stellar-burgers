import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsAll, selectFeedSelector } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  const feeds = useSelector(selectFeedSelector);
  const orders: TOrder[] = feeds.orders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsAll());
  }, []);

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
