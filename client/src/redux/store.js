import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice'
import { chatReducer } from './slices/chat/chatSlice';
import { modalReducer } from './slices/modalSlice';
import { messageReducer } from './slices/chat/messageSlice';
import { notificationsReducer } from './slices/chat/notificationsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        message: messageReducer,
        modal: modalReducer,
        notifications: notificationsReducer
    }
});