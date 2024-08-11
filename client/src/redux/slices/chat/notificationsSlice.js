import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { declineRestoreChatRequestNotificationService, getAllNotificationsService } from "../../../services/notifiationService";

const initialState = {
    notifications: [],
};

export const getAllNotifications = createAsyncThunk(
    'notifications/getAllNotifications',
    async () => {
        const {data: response} = await getAllNotificationsService();
        return response;
    }
)

export const declineNotification = createAsyncThunk(
    'notifications/declineNotification',
    async (norificationId) => {
        const {data: response} = await declineRestoreChatRequestNotificationService(norificationId);
        console.log(response);
        
        return response;
    }
)

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            })

            .addCase(declineNotification.fulfilled, (state, action) => {
                state.notifications = action.payload;
            })
    }
});



export const { actions, reducer: notificationsReducer } = notificationsSlice;                                                           