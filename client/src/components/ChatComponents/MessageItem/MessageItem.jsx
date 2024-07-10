import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/slices/chat/messageSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageImage } from './MessageImage/MessageImage';
import { ModalRoot } from '../../Modals/ModalRoot';
import { DeleteMessageModal } from '../../Modals/DeleteMessageModal/DeleteMessageModal';

import { circularTransitionRightToBottom } from '../../../utils/animationVariants';
import messageDropDownIcon from '../../../assets/icons/message-drop-down.png';

import './MessageItem.css';

export const MessageItem = ({ message, currentUserId, setMessageData }) => {
  const messageFromReceiver = currentUserId !== message.sender;
  const dispatch = useDispatch();

  const isDeleteModalOpen = useSelector(state => state.message.isDeleteModalOpen);
  const isEditModalOpen = useSelector(state => state.message.isEditModalOpen);

  const [showDropDownIcon, setShowDropDownIcon] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
 
  useEffect(() => {
    if(isDeleteModalOpen || isEditModalOpen) {
      setShowDropDownIcon(false);
      setDropDownOpen(false);
    }

  }, [isDeleteModalOpen, isEditModalOpen])

  const dropDownIconCondition = !messageFromReceiver && showDropDownIcon;

  const showDropDownIconHandler = (e) => {
    e.stopPropagation();
    setShowDropDownIcon(true);
  }

  const hideDropDownIconHandler = (e) => {
    e.stopPropagation();
    setShowDropDownIcon(false);
  }

  const openDropDownHandler = (e) => {
    e.stopPropagation();
    setDropDownOpen(prev => !prev);
  }

  const openEditMessageHandler = (e) => {
    e.stopPropagation()
    dispatch(actions.openEditMessage(message));
    setMessageData(message.body.text);
  }

  
  return (
    <div
      className={`message-container ${messageFromReceiver ? "left" : "right"}`}
      onMouseEnter={showDropDownIconHandler}
      onMouseLeave={hideDropDownIconHandler}
    >
      <div className={`corner ${messageFromReceiver ? 'corner-left' : 'corner-right'}`}></div>
      {
        dropDownIconCondition && <img
          className='message-drop-down-icon'
          src={messageDropDownIcon}
          alt="drop-down"
          onClick={openDropDownHandler}
        />
      }

      <AnimatePresence>
        {
          dropDownOpen &&
          <motion.div
            className="message-drop-down-container"
            variants={circularTransitionRightToBottom}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {
              message.body.text !== "" &&
              <div
                className="message-drop-down-item"
                onClick={openEditMessageHandler}
              >
                Edit
              </div>
            }

            <div
              className="message-drop-down-item"
              onClick={() => dispatch(actions.openDeleteMessageModal(message))}
            >
              Delete
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <p className='message__text'>
        {message.body.text}
      </p>
      {
        message.body.images &&
        <div className={`message__images ${messageFromReceiver ? 'image-left' : 'image-right'}`}>
          {
            message.body.images.map((image, index) => {
              return <MessageImage key={index} image={image} />
            })
          }
        </div>
      }

      <p className='message__time'>
        {message.body.timeSend}
      </p>
    </div>
  )
}
