import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '../../../../redux/slices/userSlice';
import { actions as modalActions } from '../../../../redux/slices/modalSlice';
import { actions as chatActions } from '../../../../redux/slices/chat/chatSlice';

import { logout } from '../../../../services/authService';
import { removeCookie } from '../../../../services/cookiesService';

import { ModalRoot } from '../../../Modals/ModalRoot';

import { UserIcon } from '../../../Icons/UserIcon/UserIcon';
import { SenderModal } from '../../../Modals/SenderModal/SenderModal';
import logoutIcon from '../../../../assets/icons/logout.png';


import './UserSideBar.css';
import { useState } from 'react';

export const UserSideBar = () => {
    const currentUser = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentUserModalOpen, setCurrentUserModalOpen] = useState(false);

    const logoutHandler =  () => {
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
                        className={'user-avatar'}
                        
                    />
                </div>
                <div className='user-info'>
                    <span className='user-info__username'>{currentUser?.username} </span>
                    <span className='user-info__phone'>{currentUser?.phone} </span>
                </div>
            </div>

            <div className="user-tools">
                <motion.img
                    className='logout'
                    src={logoutIcon}
                    alt="logout"
                    title='Logout'

                    whileHover={{ scale: 1.02 }}
                    onClick={logoutHandler}
                />
            </div>

        </div>
    )
}
