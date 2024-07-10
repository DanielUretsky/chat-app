import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion";
import { SideBar } from "../../components/ChatComponents/SideBar/SideBar";
import { ChatLayout } from "../../components/ChatComponents/ChatLayout/ChatLayout";
import { NoChatsLayout } from "../../components/ChatComponents/NoChatsLayout/NoChatsLayout";

import './Chat.css';

export const Chat = () => {
  const currentChat = useSelector(state => state.chat.currentChat);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <SideBar />
        <AnimatePresence>
          {
            currentChat ? <ChatLayout currentChat={currentChat} /> : <NoChatsLayout />
          }
        </AnimatePresence>
      </div>
    </div>
  )
}
