import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';

import { UserIcon } from '../Icons/UserIcon/UserIcon';

import restoreChatIcon from '../../assets/icons/restore.png';

import './DeletedChatListItem.css';
import { restoreChat, setDeletedUserChats, setUserChats } from '../../redux/slices/chat/chatSlice';
import { SocketContext } from '../../context/SocketContext';
export const DeletedChatListItem = ({ deletedChat }) => {
  const deletedChatMember = deletedChat.members && deletedChat.members[0];
  const currentUser = useSelector(state => state.user.user);
  const { theme } = useTheme();
  const{ socket } = useContext(SocketContext);

  const [isHover, setIsHover] = useState(false);
  
  const dispatch = useDispatch()

  const restoreChatHndler = async(e) => {
    console.log(deletedChat._id);
    e.stopPropagation();
    if(deletedChat.deletedFor === 'all') {
      socket?.emit('restore-chat-request', deletedChatMember._id, currentUser?.username, deletedChat?._id);
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
          onClick={restoreChatHndler}
          title='Restore chat'
        />
      }
      <div className="chat-list-item-user">
        <span>{deletedChatMember?.username}</span>
      </div>
    </div> 
  )
}
