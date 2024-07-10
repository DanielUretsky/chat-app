import { useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { actions as chatActions, setUserChats } from '../../../redux/slices/chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

import { UserSideBar } from './UserSideBar/UserSideBar';
import { SideBarSearch } from './SideBarSearch/SideBarSearch';
import { ChatListItem } from '../ChatListItem/ChatListItem';
import { ModalRoot } from '../../Modals/ModalRoot';
import { DeleteChatModal } from '../../Modals/DeleteChatModal/DeleteChatModal';

import { AnimatePresence } from 'framer-motion';
import './SideBar.css';

export const SideBar = () => {
    const { socket } = useContext(SocketContext);

    const currentUser = useSelector(state => state.user.user);

    const chats = useSelector(state => state.chat.userChats);
    const currentChat = useSelector(state => state.chat.currentChat);
    const isDeletedChatModalOpen = useSelector(state => state.chat.deletedChat.isDeletedChatModalOpen);
 
    const filteredChats = chats?.filter(chat => chat?.deletedFor !== currentUser?._id && chat?.deletedFor !== "all");

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setUserChats());
    }, [])

    useEffect(() => {
        socket?.on('chat-created', (room) => {
            console.log(currentChat);
            console.log('chat created successfully');
            dispatch(setUserChats());
        });

        socket?.on('chat-deleted', (room, deleteForAll) => {
            if(currentChat?._id === room && deleteForAll) {
                dispatch(chatActions.leaveChat());
            }

            dispatch(setUserChats());
        });

        return () => {
            socket?.off('chat-deleted');
            socket?.off('chat-created');
        }
    }, [socket, chats, currentChat, dispatch]);
    
    return (
        <div className='side-bar-container'>
            <AnimatePresence>
                {
                    isDeletedChatModalOpen &&
                    <ModalRoot>
                        <DeleteChatModal />
                    </ModalRoot>
                }
            </AnimatePresence>
            <div className="side-bar-header">
                <UserSideBar />
                <SideBarSearch />
            </div>
            <div className="side-bar-contacts">
                {
                    filteredChats && filteredChats.length > 0 ?
                    filteredChats.map(chat => {


                            if(chat?.deletedFor === "all") return null;
                            if(chat?.deletedFor === currentUser?._id) return null;
                            
                            return <ChatListItem key={chat?._id} chat={chat} />
                           
                        }) :
                        <span>No contacts</span>
                }
            </div>
        </div>
    )
}
