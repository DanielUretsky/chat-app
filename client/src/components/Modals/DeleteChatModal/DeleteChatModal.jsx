import { useContext, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { useTheme } from '../../../context/ThemeContext';

import { useDispatch, useSelector } from 'react-redux';
import { actions as chatActions, setDeletedUserChats } from '../../../redux/slices/chat/chatSlice';

import { motion } from 'framer-motion';
import { scaleIn } from '../../../utils/animationVariants';

import { deleteChatService } from '../../../services/userService';

import {CloseIcon} from '../../Icons/CloseIcon/CloseIcon';

import './DeleteChatModal.css';


export const DeleteChatModal = () => {
    const { socket } = useContext(SocketContext);
    const { theme } = useTheme();
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

       await dispatch(setDeletedUserChats()).unwrap()
        
        socket.emit('delete-chat', currentDeletedChat._id, deleteForAll);

        if(!deleteForAll && 
            currentDeletedChat._id === currentChatId) {
                dispatch(chatActions.leaveChat());
        }

        dispatch(chatActions.closeDeletedChatModal());
    }

    return (
        <motion.div 
            className={`delete-chat-modal-container ${theme === 'light' && 'delete-chat-modal-container__light'}`}
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <CloseIcon 
                className={'delete-chat-modal-container__close'} 
                func={() => dispatch(chatActions.closeDeletedChatModal())}
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
                className={`delete-chat-modal-container__confirm ${theme === 'light' && 'delete-chat-modal-container__confirm__light'}`}
                onClick={deleteChatHandler}
            >
                Delete
            </button>
        </motion.div>
    )
}
