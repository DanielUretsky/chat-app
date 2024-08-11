import { useTheme } from '../../../context/ThemeContext'
import { LogoIcon } from '../../Icons/LogoIcon/LogoIcon'

import './NoChatsLayout.css'

export const NoChatsLayout = () => {
  const { theme } = useTheme()
  return (
    <div className={`no-chats-container ${theme === 'light' && 'no-chats-container__light'}`}>
      <LogoIcon 
        className={'no-chats-container__logo-icon'} 
        logoColor={`${theme === 'light' ? '#1367c7' : '#2e2e2e'}`}
      />
      <span>No chats yet :(</span>
    </div>
  )
}
