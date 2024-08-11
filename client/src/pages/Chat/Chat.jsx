import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";

import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { SideBar } from "../../components/ChatComponents/SideBar/SideBar";
import { ChatLayout } from "../../components/ChatComponents/ChatLayout/ChatLayout";
import { NoChatsLayout } from "../../components/ChatComponents/NoChatsLayout/NoChatsLayout";

import { restoreChat, setUserChats } from "../../redux/slices/chat/chatSlice";
import { getAllNotifications } from "../../redux/slices/chat/notificationsSlice";
import './Chat.css';

export const Chat = () => {
  const { socket } = useContext(SocketContext);

  const currentChat = useSelector(state => state.chat.currentChat);
  const currentUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const room = currentChat?._id;

  useEffect(() => {
    room && socket?.emit('join_room', room);

    socket?.on(`send-restore-request-${currentUser?._id}`, async () => {
      await dispatch(getAllNotifications()).unwrap();
    });
    return () => {
      room && socket?.emit('leave_room', room);
      socket?.off(`send-restore-request-${currentUser?._id}`);
    }

  }, [socket, room]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <SideBar />
        <AnimatePresence>
          {
            currentChat ?
              <ChatLayout
                currentChat={currentChat}
              /> :
              <NoChatsLayout />
          }
        </AnimatePresence>
      </div>
    </div>
  )
}
