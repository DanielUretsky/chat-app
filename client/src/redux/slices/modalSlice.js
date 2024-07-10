import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    user: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.user = action.payload
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.user = null
        }
    
    }
});

export const { actions, reducer: modalReducer } = modalSlice;                                                           