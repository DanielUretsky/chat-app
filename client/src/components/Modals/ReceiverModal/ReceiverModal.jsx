
import { useTheme } from '../../../context/ThemeContext';
import {  motion } from 'framer-motion';

import { UserIcon } from '../../Icons/UserIcon/UserIcon';
import { scaleIn } from '../../../utils/animationVariants';

import './ReceiverModal.css'

export const ReceiverModal = ({closeModalHandler, currentReceiver }) => {
  const { theme } = useTheme();
  return (
      <motion.div
        className={`receiver-modal-container ${ theme === 'light' && 'receiver-modal-container__light' }`}
        variants={scaleIn}
        initial="initial" 
        animate="animate"
        exit="exit"
      >
        <div className="receiver-modal-image">
          <UserIcon className={'receiver-modal-image__receiver-image'} userImage={currentReceiver.image} />
        </div>
        <div className="receiver-modal-info">
          <div className="receiver-modal-info__initials">
            <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.firstName}</div>
            <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.lastName}</div>
          </div>

          <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.username}</div>
          <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.phone}</div>
          <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.email}</div>
          <div className={`receiver-info ${theme === 'light' && 'receiver-info__light'}`}>{currentReceiver.gender}</div>
        </div>
        <div className="receiver-modal-close">
          <button
            className={`receiver-modal-close__close-button ${theme === 'light' && 'receiver-modal-close__close-button__light'}`}
            onClick={closeModalHandler}
          >Close</button>
        </div>
      </motion.div>
  )
}
