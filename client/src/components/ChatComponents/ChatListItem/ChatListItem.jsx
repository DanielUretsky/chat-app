import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../../context/SocketContext';
import { useTheme } from '../../../context/ThemeContext';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from "../../../redux/slices/chat/chatSlice";

import { UserIcon } from '../../Icons/UserIcon/UserIcon';

import deleteChatIcon from '../../../assets/icons/delete.png';

import { sliceMessage } from '../../../utils/sliceMessage';
import './ChatListItem.css';


export const ChatListItem = ({ chat }) => {
  const member = chat?.members[0];

  const { theme } = useTheme();
  const {socket} = useContext(SocketContext)
  
  const currentUserId = useSelector(state => state.user.user?._id); 
  const messageFromReceiver = chat?.messages.filter(message => message.sender !== currentUserId);
  const lastMessageFromReceiver = messageFromReceiver && messageFromReceiver[messageFromReceiver.length - 1]?.body.text;
  
  const [isHover, setIsHover] = useState(false);
  const [lastMessage, setLastMessage] = useState(sliceMessage(lastMessageFromReceiver, 28, 20));

  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on('last-message', (room, message) => {
      if(chat._id === room && currentUserId !== message._id) {
        !message.images && setLastMessage(sliceMessage(message.text, 28, 20))
      }
    });
    
    return () => {
      socket?.off('last-message');
    }
  }, [lastMessage, socket]);

  const openDeletedChatModalHandler = async (e) => {
    e.stopPropagation();

    const deletedChatData = {
      _id: chat._id,
      member: chat.members[0]
    };

    dispatch(actions.openDeletedChatModal(deletedChatData));
  }

  return (
    <div
      className={`chat-list-item-container ${theme === 'light' && 'chat-list-item-container__light'}`}
      onClick={() => dispatch(actions.setCurrentChat(chat))}
      onMouseEnter={() => setIsHover(prev => !prev)}
      onMouseLeave={() => setIsHover(prev => !prev)}
      title={`${member?.username} \n${member?.email}`}
    >

      <UserIcon
        userImage={member?.image}
        className={'chat-list-item-container__user-image'}
      />

      {isHover &&
        <img
          className="chat-list-item-container__delete-icon"
          src={deleteChatIcon}
          alt="delete"
          onClick={openDeletedChatModalHandler}
          title='Delete'
        />
      }
      
      <div className="chat-list-item-user">
        <span>{member?.username}</span>
        <span className='chat-list-item-last-message'>{lastMessage}</span>
      </div>

    </div>
  )
}
