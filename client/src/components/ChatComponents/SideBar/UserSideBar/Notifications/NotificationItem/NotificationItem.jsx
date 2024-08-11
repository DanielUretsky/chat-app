import { useContext } from 'react'
import { useDispatch } from 'react-redux';

import { useTheme } from '../../../../../../context/ThemeContext';
import { SocketContext } from '../../../../../../context/SocketContext';

import { CheckIcon } from '../../../../../Icons/CheckIcon/CheckIcon';
import { CloseIcon } from '../../../../../Icons/CloseIcon/CloseIcon';

import { declineNotification } from '../../../../../../redux/slices/chat/notificationsSlice';
import { declineRestoreChatRequestNotificationService } from '../../../../../../services/notifiationService';

import './NotificationItem.css';

export const NotificationItem = ({ notification }) => {
    const { theme } = useTheme();
    const { socket } = useContext(SocketContext);

    const dispatch = useDispatch();
    
    const declineRestoreRequestHandler = async () => {
        await dispatch(declineNotification(notification?._id)).unwrap();
    }   
  
    const acceptRestoreRequestHandler = async () => {
        await dispatch(declineNotification(notification?._id)).unwrap();
        socket?.emit('restore-chat', notification?.chatId);
    }

    return (
        <div className={`notification ${theme === 'light' && 'notification__light'}`}>
            <div className="notification-date-time">
                <span className='notification-date'>
                    {notification.dateSend}
                </span>
                <span className='notification-time'>
                    {notification.timeSend}
                </span>
            </div>

            <div className='notification-message'>
                {notification.sender.username} wants to restore chat with you
            </div>
            <div className="notification-buttons">
                <CheckIcon func={acceptRestoreRequestHandler}/>
                <CloseIcon 
                    w={20} 
                    h={20} fillColor={'#CD0E0E'} 
                    func={declineRestoreRequestHandler}
                />
            </div>
        </div>
    )
}
