import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { actions } from "../../../redux/slices/chat/chatSlice";

import { UserIcon } from '../../Icons/UserIcon/UserIcon';

import deleteChatIcon from '../../../assets/icons/delete.png';

import './ChatListItem.css';
import { useTheme } from '../../../context/ThemeContext';


export const ChatListItem = ({ chat }) => {
  const member = chat?.members[0];
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();

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
        <span className=''>{member?.username}</span>
      </div>
    </div>
  )
}
