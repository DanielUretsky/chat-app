import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/slices/userSlice.js";

import { setCookie } from "../../services/cookiesService";
import { Input } from "../../components/Authenticate/Input";
import { LogoIcon } from "../../components/Icons/LogoIcon/LogoIcon";

import { login } from "../../services/authService";

import './Login.css';

export const Login = () => {
  const [err, setErrock] = useState(null);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserInfoHandleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const handleSubmit = async () => {
    try {
      const response = await login(userInfo);
      if (response?.status !== 200) return setErrock(response);

      const accessToken = response.message.data.accessToken;
      console.log(accessToken);
      setCookie("accessToken", accessToken, { path: '/' });
      dispatch(actions.login(response.message.data.user));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-container">
      <div className={`login ${theme === 'light' && 'login__light'}`}>
        <div className="login-header">
          <LogoIcon className='logo' logoColor={theme === 'light' ? 'var(--blue)' : 'var(--white)'} />
        </div>
        <div className="login-fields">
          <Input
            className={'field'}
            name={'email'}
            text={'Email'}
            setUserInfoHandleChange={setUserInfoHandleChange}
          />

          <Input
            className={'field'}
            name={'password'}
            type={'password'}
            text={'Password'}
            setUserInfoHandleChange={setUserInfoHandleChange}
          />

        </div>
        <div className="login-submit">
          <button
            onClick={handleSubmit}
          >
            Submit
          </button>
          <span style={{ color: theme === 'light' ? 'var(--dark-gray)' : 'var(--white)' }}>
            Dont  have an account? <Link
              style={{
                textDecorationColor: '',
                color: theme === 'light' ? 'var(--blue)' : 'var(--purple)'
              }} to='/registration'>Sign up</Link>
          </span>
          <span className='login-submit__error'>
            {err}
          </span>
        </div>
      </div>
    </div>
  )
}
