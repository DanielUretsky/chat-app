import React, { useState } from 'react';

import { ModalRoot } from '../../../Modals/ModalRoot';
import { MessageImageModal } from '../../../Modals/MessageImageModal/MessageImageModal';

import './MessageImage.css';
import { useEffect } from 'react';
export const MessageImage = ({image}) => {
    const [messageImageModalOpen, setMessageImageModalOpen] = useState(false);
    const [imageWidth, setImageWidth] = useState(100);
    const [imageHeight, setImageHeight] = useState(50);

    const closeMessageImageModal = (e) => {
        setMessageImageModalOpen(prev => !prev);
    }
    console.log(image);

    useEffect(() => {
        const {width, height} = image;
        
        if(width > 430) setImageWidth(430);
        else setImageWidth(width);
        
        if(height > 120) setImageHeight(120);
        else setImageHeight(height);
    }, [])
  return (
    <div>
        {messageImageModalOpen && 
            <ModalRoot>
                <MessageImageModal 
                    image={image} 
                    closeMessageImageModal={closeMessageImageModal}
                />
            </ModalRoot>
        }
        <img 
            src={image.src} 
            width={imageWidth}
            height={imageHeight}
            className='message-image' 
            alt="" 
            onClick={() => setMessageImageModalOpen(prev => !prev)}
        />
    </div>
  )
}
