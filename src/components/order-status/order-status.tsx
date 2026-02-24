import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let text = '';
  let textStyle = '';
  switch (status) {
    case 'pending':
      text = statusText.pending;
      textStyle = '#E52B1A';
      break;
    case 'done':
      text = statusText.done;
      textStyle = '#00CCCC';
      break;
    default:
      text = statusText.created;
      textStyle = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
