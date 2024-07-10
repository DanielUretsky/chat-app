import React from 'react'

export const MessageImageModal = ({image, closeMessageImageModal}) => {
    return (
        <img
            src={image.src}
            width={image.width}
            height={image.height} 
            alt="image"
            onClick={closeMessageImageModal}
        />
    )
}
