import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getChatMessages } from '../../../redux/slices/chat/chatSlice';
import { SocketContext } from '../../../context/SocketContext';

import { ChatLayoutHeader } from './ChatLayoutHeader/ChatLayoutHeader';
import { MessageItem } from '../MessageItem/MessageItem';
import { ChatLayoutTools } from './ChatLayoutTools/ChatLayoutTools';

import { ModalRoot } from '../../Modals/ModalRoot';
import { AnimatePresence } from 'framer-motion';
import { DeleteMessageModal } from '../../Modals/DeleteMessageModal/DeleteMessageModal';
import './ChatLayout.css';

export const ChatLayout = ({ currentChat }) => {
  const dispatch = useDispatch();

  const room = currentChat._id;
  const currentUser = useSelector(state => state.user.user);
  const currentMessages = useSelector(state => state.chat.currentMessages);
  const isDeleteModalOpen = useSelector(state => state.message.isDeleteModalOpen);

  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [messageData, setMessageData] = useState("");
  const messageEndListRef = useRef(null);
 
  // ---- PLAN ----
  // realized mechanism to save messages not on button click !important
  useEffect(() => {
  
    dispatch(getChatMessages(room));
  }, [currentChat, room, messages, dispatch]);
  

  
  useEffect(() => {
    dispatch(getChatMessages(room))
    if (socket) {
      socket?.emit('join_room', room);
      socket?.on('receive_message', (message) => {
        if (message.roomID === room) setMessages(prevMessages => [...prevMessages, message]);
      });

      socket?.on('message-deleted', (room) => {
        dispatch(getChatMessages(room));
      });

      socket?.on('message-updated', (room) => {
        dispatch(getChatMessages(room));
      });
    }

    return () => {
      socket?.off('receive_message');
      socket?.off('message-deleted');
      socket?.off('message-updated');
      socket?.emit('leave_room', room);

      setMessages([]);
    }
  }, [socket, currentChat, room, dispatch])

  // messages to see message in real time, should be changed

  useEffect(() => {
    messageEndListRef.current?.scrollIntoView({behavior: 'auto'});
  }, [currentMessages])
  return (
    <div
      className="chat-layout-container"
    >
      <AnimatePresence>
        {
          isDeleteModalOpen &&
          <ModalRoot>
            <DeleteMessageModal />
          </ModalRoot>
        }
      </AnimatePresence>

      <ChatLayoutHeader />

      <div className="chat-layout-main">
        {
          currentMessages?.map((message) => {
            if (!message.body.deletedForEveryone &&
              !(currentUser?._id === message.sender && message.body.deletedForSender)) {
              return (
                <MessageItem
                  key={message._id}
                  message={message}
                  currentUserId={currentUser?._id}
                  setMessageData={setMessageData}
                />
              )
            }
          })
        }
        <div ref={messageEndListRef}></div>
      </div>

      <ChatLayoutTools
        messageData={messageData}
        setMessageData={setMessageData}
      />
    </div>

  )
}
