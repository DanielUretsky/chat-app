
import { baseRequest } from "../axios/axiosConfig";

export const searchContacts = async (email) => {
    try {
        const { data: response } = await baseRequest.post('/users/contacts', { email });

        return response;
    } catch (err) {
        console.log(err);
    }
}

export const updateUserService = async (userData) => {
    try {
        const {_id, ...user} = userData;
        const { data: response } = await baseRequest.post(`users/update/${_id}`, user);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const uploadAvatarService = async(userAvatar) => {
    try {
        const {data: response} = await baseRequest.post(`users/upload-avatar`, {userAvatar});
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const getUserChats = async () => {
    try {
        const { data: response } = await baseRequest.get('/chat/get-chats');

        return response;
    } catch (err) {
        console.log(err);
    }
}

export const createNewChatService = async (senderId, receiverId) => {
    try {
        const response = await baseRequest.post(`/chat/create-chat/${senderId}/${receiverId}`);

        return response;
    } catch (err) {
        if (err.response.status === 409) return (err.response);
    }
}


export const deleteChatService = async (chatData) => {
    try {
        const response = await baseRequest.post(`/chat/delete-chat`, {chatData});
        return response;
    } catch (err) {
       console.log(err); 
    }
}

export const sendMessageService = async (message) => {
    try {
       
        const response = await baseRequest.post("/chat/send-message", { message });
        return response;

    } catch (err) {
        console.log(err);
    }
}

export const editMessageService = async (editedMessageData) => {
    try {
        const response = await baseRequest.post("/chat/edit-message", {editedMessageData});
        return response
    } catch (err) {
        console.log(err)
    }
}
export const getChatMessagesService = async (chatID) => {
    try {
        const { data: response } = await baseRequest.get(`/chat/get-messages/${chatID}`);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const deleteMessage = async (deletedMessage) => {
    try {
        const { data: response } = await baseRequest.post(`/chat/delete-message`, {deletedMessage});
        return response;
    } catch (err) {
        console.log(err);
    }
}