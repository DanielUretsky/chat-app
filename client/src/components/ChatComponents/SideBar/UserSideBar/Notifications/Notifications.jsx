import { useTheme } from '../../../../../context/ThemeContext';
import { motion } from 'framer-motion';

import { circularTransitionLeftToBottom } from '../../../../../utils/animationVariants';

import { useSelector } from 'react-redux';
import { NotificationItem } from './NotificationItem/NotificationItem';

import './Notifications.css';

export const Notifications = () => {
    const { theme } = useTheme();
    const notifications = useSelector(state => state.notifications.notifications);

    return (
        <motion.div
            className={`notifications-container ${theme === 'light' && 'notifications-container__light'}`}
            variants={circularTransitionLeftToBottom}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {notifications.length > 0 ?
                notifications?.map(notification => {
                    return <NotificationItem
                        key={notification?._id}
                        notification={notification}
                    />
                })
                :
                <span>You dont have any notifications yet</span>
            }
        </motion.div>
    )
}
