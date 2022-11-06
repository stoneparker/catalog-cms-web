import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers/store';

export interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLogged } = useSelector((state: RootState) => state.auth);

  if (!isLogged) {
    return <Navigate to='/login'/>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
