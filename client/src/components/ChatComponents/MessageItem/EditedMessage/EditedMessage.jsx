import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../redux/slices/chat/messageSlice';

import { motion } from 'framer-motion';
import { slideInLeft } from '../../../../utils/animationVariants';

import closeIcon from '../../../../assets/icons/close.png';

import './EditedMessage.css';

export const EditedMessage = ({setMessageData, textAreaRef}) => {
  const editedCurrentMessage = useSelector(state => state.message.currentMessage);
  const dispatch = useDispatch()

  const closeEditedMessageHandler = () => {
    dispatch(actions.closeEditMessage());
    setMessageData("");
    console.log();
    textAreaRef.current.innerText = "";
  }

  return (
    <motion.div 
      className='edited-message-container'
      variants={slideInLeft}
      initial="initial"
      animate="animate"
      exit="exit"
    >
        <div className="edited-message-container-message">
            <span className='edited-message-container__edit'>Edit</span>
            <span className='edited-message-container__text'>{editedCurrentMessage?.body.text}</span>
        </div>
        <img 
          className='edited-message-container__close-icon' 
          src={closeIcon} 
          alt="close" 
          onClick={closeEditedMessageHandler}
        />
    </motion.div>
  )
}

