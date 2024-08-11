import { useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '../../../../redux/slices/userSlice';
import { actions as modalActions } from '../../../../redux/slices/modalSlice';
import { actions as chatActions } from '../../../../redux/slices/chat/chatSlice';

import { removeCookie } from '../../../../services/cookiesService';

import { Notifications } from './Notifications/Notifications';
import { ModalRoot } from '../../../Modals/ModalRoot';
import { SenderModal } from '../../../Modals/SenderModal/SenderModal';
import { UserIcon } from '../../../Icons/UserIcon/UserIcon';

import notificationsIcon from '../../../../assets/icons/notification.png'
import logoutIcon from '../../../../assets/icons/logout.png';

import './UserSideBar.css';

export const UserSideBar = () => {
    const { theme } = useTheme();

    const currentUser = useSelector(state => state.user.user);
    const notifications = useSelector(state => state.notifications.notifications);

    const [currentUserModalOpen, setCurrentUserModalOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logoutHandler = () => {
        try {
            removeCookie('accessToken');
            dispatch(chatActions.leaveChat());
            dispatch(userActions.logout(null));
            navigate('/login');
        }
        catch (err) {
            console.log(err);
        }
        finally {
            dispatch(userActions.logout(null));
            removeCookie('accessToken');
            navigate('/login');
        }
    }

    const openModalHandler = () => {
        setCurrentUserModalOpen(prev => !prev);
    }


    const closeModalHandler = () => {
        setCurrentUserModalOpen(prev => !prev);
    }

    return (
        <div className="side-bar-user">
            <AnimatePresence>
                {currentUserModalOpen && (
                    <ModalRoot >
                        <SenderModal closeModalHandler={closeModalHandler} currentUser={currentUser} />
                    </ModalRoot>
                )}
            </AnimatePresence>
            <div className="user" onClick={() => dispatch(modalActions.openModal(currentUser))}>
                <div
                    className="user-image"
                    onClick={openModalHandler}
                >
                    <UserIcon
                        userImage={currentUser?.image}
                        className={`user-avatar ${theme === 'light' && 'user-avatar__light'}`}

                    />
                </div>
                <div className='user-info'>
                    <span className='user-info__username'>{currentUser?.username} </span>
                    <span className='user-info__phone'>{currentUser?.phone} </span>
                </div>
            </div>

            <div className="user-tools">

                <img
                    src={notificationsIcon}
                    alt="notifications"
                    className='notifications'
                    onClick={() => setNotificationsOpen(prev => !prev)}
                />
                <motion.img
                    className='logout'
                    src={logoutIcon}
                    alt="logout"
                    title='Logout'

                    whileHover={{ scale: 1.02 }}
                    onClick={logoutHandler}
                />

                {notifications?.length > 0 &&
                    <div className="notifications-count">
                        {notifications?.length}
                    </div>
                }

                <AnimatePresence >
                    {
                        notificationsOpen &&
                        <Notifications />
                    }
                </AnimatePresence>
            </div>

        </div>
    )
}
