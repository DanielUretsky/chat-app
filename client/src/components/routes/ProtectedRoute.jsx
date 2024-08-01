import { useEffect } from 'react';

import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/slices/userSlice';

import { getCookie, removeCookie } from '../../services/cookiesService';
import { authenticate } from '../../services/authService';

export const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = await authenticate(getCookie("accessToken"));
      
        if(!user) {
          removeCookie("accessToken");
          dispatch(actions.logout(null))
          navigate('/login')
        }
        
        dispatch(actions.authenticate(user));
      } catch (err) {
        console.log(err);
      }
    }
    authenticateUser();

  }, );

  return (
    <div>
      {getCookie("accessToken") ? <Outlet /> : <Navigate to='/login' />}
    </div>
  )

}
