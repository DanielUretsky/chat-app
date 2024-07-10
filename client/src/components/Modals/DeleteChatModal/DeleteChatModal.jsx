import { useContext, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';

import { useDispatch, useSelector } from 'react-redux';
import { actions as chatActions } from '../../../redux/slices/chat/chatSlice';

import { motion } from 'framer-motion';
import { scaleIn } from '../../../utils/animationVariants';

import { deleteChatService } from '../../../services/userService';

import closeIcon from '../../../assets/icons/close.png';
import './DeleteChatModal.css';


export const DeleteChatModal = () => {
    const { socket } = useContext(SocketContext);
    const [deleteForAll, setDeleteForAll] = useState(false);

    const currentUserId = useSelector(state => state.user.user._id);
    const currentChatId = useSelector(state => state.chat.currentChat?._id);
    const currentDeletedChat = useSelector(state => state.chat.deletedChat.currentDeletedChat);

    const dispatch = useDispatch();
    const deleteChatHandler = async() => {
        await deleteChatService({
            _id: currentDeletedChat._id, 
            deletedFor: deleteForAll ? 'all' : currentUserId
        });
        socket.emit('delete-chat', currentDeletedChat._id, deleteForAll);

        if(!deleteForAll && 
            currentDeletedChat._id === currentChatId) {
                dispatch(chatActions.leaveChat());
        }

        dispatch(chatActions.closeDeletedChatModal());
        //currentDeletedChat._id === currentChatId && dispatch(chatActions.leaveChat());
    }

    return (
        <motion.div 
            className='delete-chat-modal-container'
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <img 
                src={closeIcon} 
                alt="close" 
                onClick={() => dispatch(chatActions.closeDeletedChatModal())}
            />
            <p>Delete this chat?</p>
            <label htmlFor="deleteForReceiver">
                Also delete for {currentDeletedChat?.member.username}
                <input 
                    name='deleteForReceiver' 
                    type="checkbox" 
                    onChange={() => setDeleteForAll(prev => !prev)}/>
            </label>
            <button 
                className='delete-chat-modal-container__confirm'
                onClick={deleteChatHandler}
            >
                Delete
            </button>
        </motion.div>
    )
}
