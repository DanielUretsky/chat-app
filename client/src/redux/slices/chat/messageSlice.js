import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMessage: null,

    isDeleteModalOpen: false,
    isEditModalOpen: false,
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        openEditMessage: (state, action) => {
            if(state.isDeleteModalOpen) state.isDeleteModalOpen = false;
            
            state.currentMessage = action.payload;
            state.isEditModalOpen = true;
        },

        closeEditMessage: (state) => {
            state.currentMessage = null;
            state.isEditModalOpen = false
        },

        openDeleteMessageModal: (state, action) => {
            if(state.isEditModalOpen) state.isEditModalOpen = false;

            state.currentMessage = action.payload;
            state.isDeleteModalOpen = true;
        },

        closeDeleteMessageModal: (state) => {
            state.currentMessage = null;
            state.isDeleteModalOpen = false;
        }
    }
});


//#D052FF
export const { actions, reducer: messageReducer } = messageSlice;                                                           