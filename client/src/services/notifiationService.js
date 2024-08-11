import { baseRequest } from "../axios/axiosConfig";

export const getAllNotificationsService = async () => {
    try {
        const response = await baseRequest.get('/notifications/get-notifications');
        return response;
    } catch (err) {
        console.log(err);

    }
}

export const sendRestoreChatRequestNotification = async (notificationData) => {
    try {
        const response = await baseRequest.post(`/notifications/send-notification`, { notificationData });
        return response;
    } catch (err) {
        console.log(err);

        if (err.response.status == 409) {
            alert(err.response.data);
        }
    }
}

export const declineRestoreChatRequestNotificationService = async (notificationId) => {
    try {
        const  response = await baseRequest.delete('/notifications/remove-notification', { data: { notificationId } });
        return response;
    } catch (err) {
        console.log(err);

    }
}