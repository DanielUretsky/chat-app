import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../context/ThemeContext';
import { actions } from '../../../../redux/slices/chat/messageSlice';

import { motion } from 'framer-motion';
import { slideInLeft } from '../../../../utils/animationVariants';

import closeIcon from '../../../../assets/icons/close.png';

import './EditedMessage.css';
import { CloseIcon } from '../../../Icons/CloseIcon/CloseIcon';

export const EditedMessage = ({setMessageData, textAreaRef}) => {
  const { theme } = useTheme();
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
      className={`edited-message-container ${ theme === 'light' && 'edited-message-container__light' }`}
      variants={slideInLeft}
      initial="initial"
      animate="animate"
      exit="exit"
    >
        <div className={`edited-message-container-message ${theme === 'light' && 'edited-message-container-message__light'}`}>
            <span className='edited-message-container__edit'>Edit</span>
            <span className='edited-message-container__text'>{editedCurrentMessage?.body.text}</span>
        </div>
        <CloseIcon closeFunc={closeEditedMessageHandler}/>
    </motion.div>
  )
}

