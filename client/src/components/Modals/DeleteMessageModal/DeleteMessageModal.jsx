import { useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { useTheme } from '../../../context/ThemeContext';

import { motion } from 'framer-motion';
import { scaleIn } from '../../../utils/animationVariants';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/slices/chat/messageSlice';

import { CloseIcon } from '../../Icons/CloseIcon/CloseIcon';
import { deleteMessage } from '../../../services/userService';

import './DeleteMessageModal.css';

export const DeleteMessageModal = () => {
  const { theme } = useTheme();
  const {socket} = useContext(SocketContext);

  const roomId = useSelector(state => state.chat.currentChat?._id);
  const messageId = useSelector(state => state.message.currentMessage?._id);
  const dispatch = useDispatch();

  const deleteMessageHandler = async(e) => {
    const deletedFor = e.target.value;

    await deleteMessage({messageId, roomId, deletedFor});
    socket?.emit('delete-message', roomId);
    dispatch(actions.closeDeleteMessageModal());
  }

  return (
    <motion.div
      className={`delete-message-modal-container ${ theme === 'light' && 'delete-message-modal-container__light'}`}
      variants={scaleIn}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <CloseIcon 
        className={'delete-message-modal-container__close-icon'} 
        func={() => dispatch(actions.closeDeleteMessageModal())}
      />
      <p>Delete message?</p>

      <div className="delete-message-modal-container-buttons">
        <button
          value="sender"
          onClick={deleteMessageHandler}
        >
          Delete for me
        </button>

        <button
          value="everyone"
          onClick={deleteMessageHandler}
        >
          Delete for everyone
        </button>
      </div>
    </motion.div>
  )
}
