import { useContext } from 'react'

import { motion } from 'framer-motion';
import { scaleIn } from '../../../utils/animationVariants';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/slices/chat/messageSlice';

import { deleteMessage } from '../../../services/userService';
import { SocketContext } from '../../../context/SocketContext';

import closeIcon from '../../../assets/icons/close.png';

import './DeleteMessageModal.css';

export const DeleteMessageModal = () => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.chat.currentChat?._id);
  const messageId = useSelector(state => state.message.currentMessage?._id);
  const {socket} = useContext(SocketContext);

  const deleteMessageHandler = async(e) => {
    const deletedFor = e.target.value;

    await deleteMessage({messageId, roomId, deletedFor});
    socket?.emit('delete-message', roomId);
    dispatch(actions.closeDeleteMessageModal());
  }

  return (
    <motion.div
      className='delete-message-modal-container'
      variants={scaleIn}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <img
        src={closeIcon}
        className='delete-message-modal-container__close-icon'
        alt="close"
        onClick={() => dispatch(actions.closeDeleteMessageModal())}
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
