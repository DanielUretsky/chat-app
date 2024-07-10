import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { actions } from "../../../redux/slices/chat/chatSlice";

import { UserIcon } from '../../Icons/UserIcon/UserIcon';

import deleteChatIcon from '../../../assets/icons/delete.png';

import './ChatListItem.css';


export const ChatListItem = ({ chat }) => {
  const member = chat?.members[0];

  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

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
      className="chat-list-item-container"
      onClick={() => dispatch(actions.setCurrentChat(chat))}
      onMouseEnter={() => setIsHover(prev => !prev)}
      onMouseLeave={() => setIsHover(prev => !prev)}
    >
      <UserIcon
        userImage={member?.image}
        className={'chat-list-item-container__user-image'}
      />
      <div className="chat-list-item-user">
        {isHover &&
          <img
            className="chat-list-item-container__delete-icon"
            src={deleteChatIcon}
            alt="delete"
            onClick={openDeletedChatModalHandler}
            title='Delete'
          />
        }
        <span>{member?.username}</span>
        <p className="chat-list-item-last-message">

        </p>
      </div>
    </div>
  )
}
