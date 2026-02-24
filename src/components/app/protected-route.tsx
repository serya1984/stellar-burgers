import React from 'react';
import { useSelector } from '../../../src/services/store';
import {
  selectIsAuthChecked,
  selectUser
} from '../../../src/services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const selector = useSelector();
  const isAuthCheced = selector(selectIsAuthChecked);
  const user = selector(selectUser);
  const location = useLocation();

  if (!isAuthCheced) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};
