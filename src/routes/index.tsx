import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Products from '../pages/app/Main';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import { RootState } from '../reducers/store';

const Routing: React.FC = () => {
  const { isLogged } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path='/*'
          element={<Navigate to={`${isLogged ? '/' : '/login'}`}/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;
