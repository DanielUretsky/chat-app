import React from 'react';
import defaultUserAvatar from '../../../assets/icons/user-default-avatar.png';

export const UserIcon = ({userImage, className }) => {
    
    return (
        <img
            className={className}
            src={userImage ? userImage : defaultUserAvatar}
            alt="user avatar"   
        />
    )
}
