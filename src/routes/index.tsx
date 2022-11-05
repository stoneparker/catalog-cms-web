import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Products from '../pages/app/Main';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';


const Routing: React.FC = () => {
  const isLogged = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/*' element={<Navigate to='/login'/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;
