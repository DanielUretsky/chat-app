import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../context/ThemeContext';

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
  const { socket } = useContext(SocketContext);
  const { theme } = useTheme();

  const room = currentChat._id;

  const currentUser = useSelector(state => state.user.user);
  const currentMessages = useSelector(state => state.chat.currentMessages);
  const isDeleteModalOpen = useSelector(state => state.message.isDeleteModalOpen);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [messageData, setMessageData] = useState("");

  const messageEndListRef = useRef(null);
  
  useEffect(() => {
    const getMessages = async () => {
      const messagesArray = await dispatch(getChatMessages(room)).unwrap();
      setMessages(messagesArray);
    }

    getMessages();
  }, [currentChat, room, dispatch])

  useEffect(() => {

    dispatch(getChatMessages(room));

    if (socket) {
    
      socket?.on('receive_message', (message) => {
        if (message.roomID === room) {
       
          setMessages(prev => [...prev, {
            body: {
              deleteForEveryone: false,
              deletedForSender: false,
              images: message.images,
              text: message.text,
              timeSend: message.timeSend
            },
            sender: message._id,
          }])
        }
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
    }
  }, [socket, room, messages, dispatch])

  useEffect(() => {
    messageEndListRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [currentMessages]);

  return (
    <div
      className={`chat-layout-container ${theme === 'light' && 'chat-layout-container__light'}`}
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
          currentMessages?.length > 0 ?
          currentMessages?.map((message) => {
            if (!message?.body?.deletedForEveryone &&
              !(currentUser?._id === message?.sender && message.body?.deletedForSender)) {
              return (
                <MessageItem
                  key={message?._id}
                  message={message}
                  currentUserId={currentUser?._id}
                  setMessageData={setMessageData}
                />
              )
            }
          })
          :
          <span style={{margin: '0 auto'}}>No messages yet</span>
        }
        <div ref={messageEndListRef}></div>
      </div>

      <ChatLayoutTools
        messageData={messageData}
        setMessageData={setMessageData}
        setMessages={setMessages}
      />
    </div>

  )
}
