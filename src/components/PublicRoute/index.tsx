import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers/store';

export interface Props {
  children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isLogged } = useSelector((state: RootState) => state.auth);

  if (isLogged) {
    return <Navigate to='/'/>;
  }

  return <>{children}</>;
}

export default PublicRoute;
