import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { motion } from 'framer-motion';

import { SenderInfoField } from './SenderInfoField/SenderInfoField';
import { UserIcon } from '../../Icons/UserIcon/UserIcon';

import { convertImageToBase64 } from '../../../utils/convertImageToBase64';
import addPictureIcon from '../../../assets/icons/add-picture.png'

import { useDispatch } from 'react-redux';
import { updateUser, uploadAvatar } from '../../../redux/slices/userSlice';

import { scaleIn } from '../../../utils/animationVariants';

import './SenderModal.css';

export const SenderModal = ({ closeModalHandler, currentUser }) => {
  const { theme } = useTheme();
  const [currentUserInfo, setCurrentUserInfo] = useState(currentUser);
  const dispatch = useDispatch();

  const setNewSenderInfoHandler = (e, name) => {
    const { innerText } = e.target;
    setCurrentUserInfo({ ...currentUserInfo, [`${name}`]: innerText })
  }

  const updateSenderInfoHandler = async () => {
    dispatch(updateUser(currentUserInfo));
  }

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertImageToBase64(file);
      await dispatch(uploadAvatar(base64)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      className={`sender-modal-container ${ theme === 'light' && 'sender-modal-container__light'}`}
      variants={scaleIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="sender-modal-image">
        <label htmlFor="fileInput">
          <img
            className={`sender-modal-image__add-avatar ${ theme === 'light' && 'sender-modal-image__add-avatar__light' }`}
            src={addPictureIcon}
            alt="upload avatar"
          />
        </label>
        <input
          type="file"
          id='fileInput'
          style={{ display: 'none' }}
          onChange={uploadFileHandler}
        />
        <UserIcon
          className={'sende-modal-image__receiver-image'}
          userImage={currentUser.image}
        />
      </div>
      <div className="sender-modal-info">
        <div className="sender-modal-info__initials">
          <SenderInfoField
            name={"firstName"}
            senderInfo={currentUser.firstName}
            setNewSenderInfoHandler={setNewSenderInfoHandler}
          />
          <SenderInfoField
            name={"lastName"}
            senderInfo={currentUser.lastName}
            setNewSenderInfoHandler={setNewSenderInfoHandler}
          />
        </div>

        <SenderInfoField
          setNewSenderInfoHandler={setNewSenderInfoHandler}
          name={"username"}
          senderInfo={currentUser.username}
        />
        <SenderInfoField
          setNewSenderInfoHandler={setNewSenderInfoHandler}
          name={"phone"}
          senderInfo={currentUser.phone}
        />
        <SenderInfoField
          setNewSenderInfoHandler={setNewSenderInfoHandler}
          name={"email"}
          senderInfo={currentUser.email}
        />
        <SenderInfoField
          setNewSenderInfoHandler={setNewSenderInfoHandler}
          name={"gender"}
          senderInfo={currentUser.gender}
        />
      </div>
      <div className="sender-modal-tools">
        <button
          className={`sender-modal-tools__close-button ${ theme === 'light' && 'sender-modal-tools__close-button__light'}`}
          onClick={closeModalHandler}
        >
          Close
        </button>
        <button
          className={`sender-modal-tools__update-button ${ theme === 'light' && 'sender-modal-tools__update-button__light'}`}
          onClick={updateSenderInfoHandler}
        >
          Update
        </button>
      </div>
    </motion.div>
  )
}
