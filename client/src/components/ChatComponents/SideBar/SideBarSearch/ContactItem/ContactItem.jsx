import { useDispatch, useSelector } from 'react-redux';
import { createNewChat } from '../../../../../redux/slices/chat/chatSlice';

import defaultUserAvatar from '../../../../../assets/icons/user-default-avatar.png';
import { useContext } from 'react';
import { SocketContext } from '../../../../../context/SocketContext';
import './ContactItem.css';

export const ContactItem = ({ contact, setFocus }) => {
    const senderId = useSelector(state => state.user.user._id);
    const receiverId = contact._id;
    const { socket } = useContext(SocketContext);
    const dispatch = useDispatch();

    const createNewChatHandler = async () => {
        await dispatch(createNewChat({ senderId, receiverId })).unwrap();
        socket?.emit('create-chat');

        setFocus(prev => !prev);
    }

    return (
        <div
            className='contact-item-container'
            onClick={createNewChatHandler}
        >
            <div className="contact-item-image">
                <img src={contact.image ? contact.image : defaultUserAvatar} alt="avatar" />
            </div>
            <div className="contact-item-info">
                <span>{contact.username}</span>
                <span>{contact.email}</span>
            </div>
        </div>
    )
}
