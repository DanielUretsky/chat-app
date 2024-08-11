import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { actions as chatActions } from '../../../../redux/slices/chat/chatSlice';

import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../../context/SocketContext';

import { circularTransitionRightToBottom } from '../../../../utils/animationVariants';

import { ModalRoot } from '../../../Modals/ModalRoot';
import { ReceiverModal } from '../../../Modals/ReceiverModal/ReceiverModal';
import { UserIcon } from '../../../Icons/UserIcon/UserIcon';

import dropDownIcon from '../../../../assets/icons/drop-down.png';

import { useTheme } from '../../../../context/ThemeContext';

import './ChatLayoutHeader.css';

export const ChatLayoutHeader = () => {
    const { theme } = useTheme();

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [receiverModalOpen, setReceiverModalOpen] = useState(false);

    const currentChat = useSelector(state => state.chat.currentChat);
    const currentReciever = currentChat.members[0];
    
    const dispatch = useDispatch();

    const openModalHandler = () => {
        setReceiverModalOpen(prev => !prev);
        setDropDownOpen(prev => !prev);
    }

    const closeModalHandler = () => {
        setReceiverModalOpen(prev => !prev);
    }

    const leaveChatHandler = () => {      
        dispatch(chatActions.leaveChat());
    }
    return (
        <div className={`chat-layout-header ${theme === 'light' && 'chat-layout-header__light'}`}>
            <AnimatePresence>
                {receiverModalOpen &&
                    <ModalRoot>
                        <ReceiverModal
                            closeModalHandler={closeModalHandler}
                            currentReceiver={currentReciever}
                        />
                    </ModalRoot>
                }
            </AnimatePresence>
            <div className="receiver">

                <div className="receiver-info">
                    <UserIcon
                        userImage={currentReciever.image}
                        className={"receiver-info__image"}
                    />
                    <span>{currentReciever.username}</span>
                </div>

                <div className="receiver-tools">
                    <img
                        src={dropDownIcon}
                        alt="drop down menu"
                        className='receiver-tools__drop-down'
                        onClick={() => setDropDownOpen(prev => !prev)}
                    />
                    <AnimatePresence>
                        {dropDownOpen &&
                            <motion.div
                                className={`drop-down-container ${theme === 'light' && 'drop-down-container__light'}`}
                                variants={circularTransitionRightToBottom}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <div
                                    className="drop-down-item"
                                    onClick={openModalHandler}
                                >
                                    Info
                                </div>
                                <div
                                    className="drop-down-item"
                                    onClick={leaveChatHandler}
                                >
                                    Leave
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>

            </div>
        </div>

    )
}
