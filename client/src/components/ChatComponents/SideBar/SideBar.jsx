import { useEffect, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { useTheme } from '../../../context/ThemeContext';
import { SocketContext } from '../../../context/SocketContext';
import { actions as chatActions, restoreChat, setDeletedUserChats, setUserChats } from '../../../redux/slices/chat/chatSlice';

import { UserSideBar } from './UserSideBar/UserSideBar';
import { SideBarSearch } from './SideBarSearch/SideBarSearch';
import { ChatListItem } from '../ChatListItem/ChatListItem';
import { ModalRoot } from '../../Modals/ModalRoot';
import { DeleteChatModal } from '../../Modals/DeleteChatModal/DeleteChatModal';
import { EmptyContactsList } from '../../Icons/EmtyContactsList/EmptyContactsList';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';
import { DeletedChatListItem } from '../../DeletedChatListItem/DeletedChatListItem';

import './SideBar.css';
import { getAllNotifications } from '../../../redux/slices/chat/notificationsSlice';

export const SideBar = () => {
    const { socket } = useContext(SocketContext);
    const { theme } = useTheme()

    const [activeNavigationChatButton, setActiveNavigationChatButton] = useState('myChats');

    const currentUser = useSelector(state => state.user.user);
    const chats = useSelector(state => state.chat.userChats);
    const deletedChats = useSelector(state => state.chat.userDeletedChats);
    const currentChat = useSelector(state => state.chat.currentChat);
    const isDeletedChatModalOpen = useSelector(state => state.chat.deletedChat.isDeletedChatModalOpen);

    const filteredChats = chats?.filter(chat => chat?.deletedFor !== currentUser?._id && chat?.deletedFor !== "all");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllTypeOfUserChats = async () => {
            await dispatch(setUserChats()).unwrap();
            await dispatch(setDeletedUserChats()).unwrap();
        }

        const fetchNotifications = async () => {
            await dispatch(getAllNotifications()).unwrap();
        }
        fetchAllTypeOfUserChats();
        fetchNotifications();
    }, [dispatch]);

    useEffect(() => {
        socket?.on('chat-created', (room) => {
            dispatch(setUserChats());
        });

        socket?.on('chat-deleted', (room, deleteForAll) => {
            if (currentChat?._id === room && deleteForAll) {
                dispatch(chatActions.leaveChat());
            }

            if (deleteForAll) dispatch(setDeletedUserChats());

            dispatch(setUserChats());
        });

        socket?.on('chat-restored', async (chatId) => {
            await dispatch(restoreChat(chatId)).unwrap();
            await dispatch(setDeletedUserChats()).unwrap();
            await dispatch(setUserChats()).unwrap();
        })

        return () => {
            socket?.off('chat-deleted');
            socket?.off('chat-created');
            socket?.off('chat-restored');
        }
    }, [socket, chats, currentChat, dispatch]);

    const changeActiveNavigationButton = () => {
        setActiveNavigationChatButton(activeNavigationChatButton === 'myChats' ? 'deletedChats' : 'myChats')
    }

    return (
        <div className={`side-bar-container ${theme === "light" && 'side-bar-container__light'}`}>
            <AnimatePresence>
                {
                    isDeletedChatModalOpen &&
                    <ModalRoot>
                        <DeleteChatModal />
                    </ModalRoot>
                }
            </AnimatePresence>
            <div className={`side-bar-header ${theme === "light" && 'side-bar-header__light'}`}>
                <UserSideBar />
                <SideBarSearch />
            </div>
            <div className="side-bar-contacts">
                <div className="side-bar-contacts-nav">
                    <div
                        className={`side-bar-contacts-nav__chats 
                            ${activeNavigationChatButton === 'myChats' && 'active'}`}
                        onClick={changeActiveNavigationButton}
                    >
                        My chats
                    </div>
                    <div
                        className={`side-bar-contacts-nav__deleted-chats 
                            ${activeNavigationChatButton === 'deletedChats' && 'active'}`}
                        onClick={changeActiveNavigationButton}
                    >
                        Deleted chats
                    </div>
                </div>
                {
                    activeNavigationChatButton === 'deletedChats' && (
                        deletedChats.length > 0 ? deletedChats?.map(deletedChat => {
                            return <DeletedChatListItem key={deletedChat._id} deletedChat={deletedChat} />
                        }) :
                            <div className="side-bar-contacts__empty-deleted-chats-list">
                                <span>No deleted chats yet</span>
                            </div>
                    )
                }
                {
                    activeNavigationChatButton === 'myChats' && (
                        filteredChats && filteredChats.length > 0
                            ?
                            filteredChats.map(chat => {
                                if (chat?.deletedFor === "all") return null;
                                if (chat?.deletedFor === currentUser?._id) return null;

                                return <ChatListItem key={chat?._id} chat={chat} />

                            })
                            :
                            <div className="side-bar-contacts__empty-contact-list">
                                <EmptyContactsList />
                            </div>
                    )
                }
            </div>
            <div className="side-bar-theme-toggle">
                <div className='side-bar-theme-toggle__toggle'>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
