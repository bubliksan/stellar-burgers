import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructor,
  clearConstructor
} from '../../services/constructor/constructorSlice';
import { getUser } from '../../services/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  deleteOrder,
  getOrder,
  getStatus
} from '../../services/order/orderSlice';
import { sendOrder } from '../../services/order/actions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructor);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const orderRequest = useSelector(getStatus);
  const orderModalData = useSelector(getOrder);
  const order: string[] = [];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    }
    order.push(constructorItems.bun?._id);
    constructorItems.ingredients.map((item) => order.push(item._id));
    order.push(constructorItems.bun?._id);
    dispatch(sendOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(deleteOrder());
    dispatch(clearConstructor());
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
