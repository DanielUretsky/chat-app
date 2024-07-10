import React from 'react'
import {  motion } from 'framer-motion';

import { UserIcon } from '../../Icons/UserIcon/UserIcon';
import { scaleIn } from '../../../utils/animationVariants';

import './ReceiverModal.css'

export const ReceiverModal = ({closeModalHandler, currentReceiver }) => {
  return (
      <motion.div
        className='receiver-modal-container'
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
            <div className='receiver-info'>{currentReceiver.firstName}</div>
            <div className='receiver-info'>{currentReceiver.lastName}</div>
          </div>

          <div className='receiver-info'>{currentReceiver.username}</div>
          <div className='receiver-info'>{currentReceiver.phone}</div>
          <div className='receiver-info'>{currentReceiver.email}</div>
          <div className='receiver-info'>{currentReceiver.gender}</div>
        </div>
        <div className="receiver-modal-close">
          <button
            className='receiver-modal-close__close-button'
            onClick={closeModalHandler}
          >Close</button>
        </div>
      </motion.div>
  )
}
