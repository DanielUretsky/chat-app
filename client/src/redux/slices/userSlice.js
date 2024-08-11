import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserService, uploadAvatarService } from "../../services/userService";

const initialState = {
    user: null,
};

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData) => {
        const response = await updateUserService(userData);
        return response;
    }
);

export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (userAvatar) => {
        const response = await uploadAvatarService(userAvatar);
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            
            state.user = action.payload;
        },

        logout: (state, action) => {
            state.user = action.payload;
        },

        authenticate: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder => 
        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    )
});

export const { actions, reducer: userReducer } = userSlice;                                                           