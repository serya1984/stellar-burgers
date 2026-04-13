import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../src/services/store';
import { login } from '../../services/user/action';
import { selectIsAuthChecked } from '../../services/user/slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector();
  const isAuthChecked = selector(selectIsAuthChecked);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(login({ email, password }));

    if (isAuthChecked) {
      return <Navigate to={'/'} />;
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
