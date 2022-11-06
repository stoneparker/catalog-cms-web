import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Products from '../pages/app/Main';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

import ProtectedRoute from '../components/ProtectedRoute';

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/*' element={<Navigate to='/login'/>} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;
