import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { SocketContext } from '../../../../../context/SocketContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { createNewChat } from '../../../../../redux/slices/chat/chatSlice';

import defaultUserAvatar from '../../../../../assets/icons/user-default-avatar.png';
import './ContactItem.css';

export const ContactItem = ({ contact, setFocus }) => {
    const { socket } = useContext(SocketContext);
    const { theme } = useTheme();

    const receiverId = contact._id;

    const senderId = useSelector(state => state.user.user._id);
    const dispatch = useDispatch();

    const createNewChatHandler = async () => {
        await dispatch(createNewChat({ senderId, receiverId })).unwrap();
        socket?.emit('create-chat');

        setFocus(prev => !prev);
    }

    return (
        <div
            className={`contact-item-container ${theme === 'light' && 'contact-item-container__light'}`}
            onClick={createNewChatHandler}
            title={`${contact.username} \n${contact.email}`}
        >
            <div className="contact-item-image">
                <img src={contact.image ? contact.image : defaultUserAvatar} alt="avatar" />
            </div>
            <div className="contact-item-info">
                <span className='contact-item-info__username'>{contact.username}</span>
                <span className='contact-item-info__email'>{contact.email}</span>
            </div>
        </div>
    )
}
