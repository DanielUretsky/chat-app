import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { LogoIcon } from '../../components/Icons/LogoIcon/LogoIcon';
import { UserBgIcon } from '../../components/Icons/BgLayoutIcons/UserBgIcon/UserBgIcon';
import { WorldBgIcon } from '../../components/Icons/BgLayoutIcons/WorldBgIcon/WorldBgIcon';

import './Layout.css';

export const Layout = () => {
  const currentUser = useSelector(state => state.user.user);
  const [logoColor, setLogoColor] = useState("#fff");

  const navigate = useNavigate();
 
  const changeLogoColorHandler = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setLogoColor(randomColor);
  }

  return (
    <div className="layout" onMouseOver={changeLogoColorHandler}>
      <UserBgIcon className={'user-bg-icon'} />
      <WorldBgIcon className={'world-bg-icon'} />

      <div className="layout-container">

        <motion.div
          className="layout-greetings"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {
            currentUser ?
              <span>Hello {currentUser?.username}!</span> :
              <span>Hello there!</span>
          }
        </motion.div>

        <motion.div
          className="layout-logo"
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
        >
          <LogoIcon className={"logo"} logoColor={logoColor} />
        </motion.div>

        <motion.div
          className="layout-options"
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 300, opacity: 0 }}
        >
          {
            currentUser ?
              <button onClick={() => navigate('/chat')}>Go chat</button> :
              <div className='layout-options__auth'>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/registration')}>Registration</button>
              </div>
          }
        </motion.div>
        
      </div>
    </div>
  )
}
