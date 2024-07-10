import React from 'react'


import './NoChatsLayout.css'
import { LogoIcon } from '../../Icons/LogoIcon/LogoIcon'
export const NoChatsLayout = () => {
  return (
    <div className='no-chats-container'>
      <LogoIcon 
        className={'no-chats-container__logo-icon'} 
        logoColor={'rgb(51, 51, 51'}
      />
      <span>No chats yet :(</span>
    </div>
  )
}
