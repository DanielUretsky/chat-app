import { useContext, useEffect, useRef, useState } from 'react';

import { SocketContext } from '../../../../context/SocketContext';
import { useTheme } from '../../../../context/ThemeContext';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../redux/slices/chat/messageSlice';
import { getCurrentTime } from '../../../../utils/getCurrentTime';

import { AnimatePresence } from 'framer-motion';

import EmojiPicker from 'emoji-picker-react';
import { EditedMessage } from '../../MessageItem/EditedMessage/EditedMessage';

import { convertImageToBase64 } from '../../../../utils/convertImageToBase64';
import { editMessageService, sendMessageService } from '../../../../services/userService';

import sendIcon from '../../../../assets/icons/send.png'
import pickEmojiIcon from '../../../../assets/icons/emoji-pick.png';
import addPictureIcon from '../../../../assets/icons/add-picture.png';

import './ChatLayoutTools.css';

export const ChatLayoutTools = ({ messageData, setMessageData }) => {
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const { theme } = useTheme();
    const textAreaRef = useRef(null);

    const currentChat = useSelector(state => state.chat.currentChat);
    const currentUser = useSelector(state => state.user.user);
    const isEditModalOpen = useSelector(state => state.message.isEditModalOpen);
    const editedMessage = useSelector(state => state.message.currentMessage);

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [isMessageEmpty, setIsMessageEmpty] = useState(true);
    const [messageImagesArray, setMessageImagesArray] = useState(null);

    const room = currentChat._id;
    //if messages dosnt send check useEffect
    useEffect(() => {
        const handleInput = () => {
            setIsMessageEmpty(textAreaRef.current.innerText.trim() === '');
        }

        const span = textAreaRef.current;
        span.addEventListener('input', handleInput);

        return () => {
            span.removeEventListener('input', handleInput);
        };
    }, []);

    const uploadFileHandler = async (e) => {
        let base64ArrayFiles = [];
        try {
            const files = e.target.files;
            for (let file of files) {
                let base64 = await convertImageToBase64(file);
                base64ArrayFiles.push(base64);
            };

            setMessageImagesArray(base64ArrayFiles);
            e.target.value = null;
        } catch (err) {
            console.log(err);
        }
    }

    const sendMessageHandler = async () => {
        if ((messageData === "" || messageData.trim() === "") && !messageImagesArray) return;

        emojiOpen && setEmojiOpen((prev) => !prev);

        const message = {
            _id: currentUser._id,
            roomID: room,
            text: messageData,
            images: messageImagesArray ? messageImagesArray : null,
            timeSend: getCurrentTime(),
        };

        //to save message in DB
        await sendMessageService(message);

        await socket?.emit("send_message", room, message);

        setMessageImagesArray(prev => prev = null);
        setMessageData("");
        textAreaRef.current.innerText = "";
    }

    const sendEditedMessageHandler = async () => {
        if ((messageData === "" || messageData.trim() === "") && !messageImagesArray) return;

        const editedMessageData = {
            messageId: editedMessage._id,
            roomId: room,
            text: messageData,
        };

        await editMessageService(editedMessageData);
        socket?.emit('update-message', room);

        dispatch(actions.closeEditMessage());
        setMessageData("");
        textAreaRef.current.innerText = "";
    }

    const messageDistributor = async () => {
        if (isEditModalOpen) {
            await sendEditedMessageHandler()
        }
        else await sendMessageHandler()
    }

    return (
        <div className="chat-layout-tools">

            <div className={`message ${theme === 'light' && 'message__light'}`}>
                <label htmlFor="messageImage">
                    <img
                        src={addPictureIcon}
                        alt="add picture"
                        className='add-picture'
                    />
                </label>
                <input
                    type="file"
                    id='messageImage'
                    style={{ display: 'none' }}
                    onChange={uploadFileHandler}
                    multiple
                />

                <AnimatePresence>
                    {
                        isEditModalOpen &&
                        <EditedMessage setMessageData={setMessageData} textAreaRef={textAreaRef} />
                    }
                </AnimatePresence>

                <span
                    ref={textAreaRef}
                    className={`message-input ${theme === 'light' && 'message-input__light'}  ${isMessageEmpty ? 'empty' : ''}`}
                    contentEditable
                    data-placeholder="Write something..."
                    onInput={(e) => setMessageData(e.target.innerText)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            messageDistributor();
                        }
                    }}
                >
                </span>

                {
                    emojiOpen &&
                    <EmojiPicker
                        style={{
                            position: 'absolute',
                            bottom: 55 + 'px',
                            right: 65 + 'px',
                            height: 400
                        }}
                        theme={theme === 'light' ? 'light' : 'dark'}
                        lazyLoadEmojis={true}
                        onEmojiClick={(e) => {
                            textAreaRef.current.innerText = messageData + e.emoji;
                            setMessageData(prev => prev += e.emoji);
                            setEmojiOpen(prev => !prev);
                        }}
                    />
                }

                <img
                    src={pickEmojiIcon}
                    className='add-emoji'
                    alt="choose emoji"
                    onClick={() => setEmojiOpen(prev => !prev)}
                />
                <img
                    src={sendIcon}
                    className='send-message'
                    alt="send"
                    onClick={messageDistributor}
                />
            </div>




        </div>
    )
}
