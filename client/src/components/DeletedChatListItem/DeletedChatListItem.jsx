import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../../context/ThemeContext';
import { SocketContext } from '../../context/SocketContext';

import { UserIcon } from '../Icons/UserIcon/UserIcon';

import { restoreChat, setDeletedUserChats, setUserChats } from '../../redux/slices/chat/chatSlice';
import { sendRestoreChatRequestNotification } from '../../services/notifiationService';
import { getCurrentTime } from '../../utils/getCurrentTime';

import restoreChatIcon from '../../assets/icons/restore.png';

import './DeletedChatListItem.css';

export const DeletedChatListItem = ({ deletedChat }) => {
  const deletedChatMember = deletedChat.members && deletedChat.members[0];

  const { theme } = useTheme();
  const{ socket } = useContext(SocketContext);
  
  const [isHover, setIsHover] = useState(false);
  const currentUser = useSelector(state => state.user.user);

  const dispatch = useDispatch()

  const sendRestoreChatNotificationHandler = async(e) => {
    e.stopPropagation();

    if(deletedChat.deletedFor === 'all') {
      const notificationTransferData = {
        notificationType: 'restore-chat',
        dateSend: new Date().toLocaleDateString(),
        timeSend: getCurrentTime(),
        chatId: deletedChat?._id,
        sender:  currentUser?._id,
        user: deletedChatMember?._id,
      };
      
      await sendRestoreChatRequestNotification(notificationTransferData);
      socket?.emit('restore-chat-request', deletedChatMember._id);
    } 
    else {
      await dispatch(restoreChat(deletedChat?._id)).unwrap();
      await dispatch(setUserChats()).unwrap();
    }

  }

  return (
    <div
      className={`chat-list-item-container ${theme === 'light' && 'chat-list-item-container__light'}`}
      onMouseEnter={() => setIsHover(prev => !prev)}
      onMouseLeave={() => setIsHover(prev => !prev)}
    >
      <UserIcon
        className={'chat-list-item-container__user-image'}
        userImage={deletedChatMember?.image}
      />

      {isHover &&
        <img
          className="chat-list-item-container__restore-icon"
          src={restoreChatIcon}
          alt="restore"
          onClick={sendRestoreChatNotificationHandler}
          title='Restore chat'
        />
      }
      <div className="chat-list-item-user">
        <span>{deletedChatMember?.username}</span>
      </div>
    </div> 
  )
}
