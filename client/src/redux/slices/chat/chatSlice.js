import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserChats, createNewChatService, getChatMessagesService, getDeletedUserChats, restoreChatService } from "../../../services/userService";

const initialState = {
    currentChat: null,
    deletedChat: {
        isDeletedChatModalOpen: false,
        currentDeletedChat: null,
    },
    userChats: [],
    userDeletedChats: [],
    currentMessages: []
};

export const setUserChats = createAsyncThunk(
    'chat/setUserChats',
    async () => {
        const response = await getUserChats();
        return response;
    }
);

export const setDeletedUserChats = createAsyncThunk(
    'chat/setDeletedUserChats',
    async () => {
        const response = await getDeletedUserChats();
        return response;
    }
);

export const createNewChat = createAsyncThunk(
    'chat/createNewChat',
    async (membersIdObj) => {
        try {
            const { senderId, receiverId } = membersIdObj;
    
            const {data, status} = await createNewChatService(senderId, receiverId);
            if(status === 409) return alert(data);
        
            return data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getChatMessages = createAsyncThunk(
    'chat/getChatMessages',
    async (chatID) => {
        try {
            const response = await getChatMessagesService(chatID);
            console.log('getMessages', response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export const restoreChat = createAsyncThunk(
    'chat/restoreChat',
    async (chatID) => {
        try {
            const response = await restoreChatService(chatID);
            console.log('getMessages', response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
  
        leaveChat: (state) => {
            state.currentChat = null;
        },

        openDeletedChatModal: (state, action) => {
            state.deletedChat.currentDeletedChat = action.payload;
            state.deletedChat.isDeletedChatModalOpen = true;
        },

        closeDeletedChatModal: (state) => {
            state.deletedChat.currentDeletedChat = null;
            state.deletedChat.isDeletedChatModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserChats.fulfilled, (state, action) => {
                state.userChats = action.payload;
            })
            .addCase(setDeletedUserChats.fulfilled, (state, action) => {
                state.userDeletedChats = action.payload;
            })
            .addCase(createNewChat.fulfilled, (state, action) => {
                state.userChats = [...state.userChats, action.payload];
            })
            .addCase(restoreChat.fulfilled, (state, action) => {
                state.userDeletedChats = action.payload;
            })
            .addCase(getChatMessages.fulfilled, (state, action) => {
                state.currentMessages = action.payload;
            })
    }
});

export const { actions, reducer: chatReducer } = chatSlice;