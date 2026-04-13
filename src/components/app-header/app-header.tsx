import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { selectUser } from '../../../src/services/user/slice';

export const AppHeader: FC = () => {
  const selector = useSelector();
  const user = selector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
