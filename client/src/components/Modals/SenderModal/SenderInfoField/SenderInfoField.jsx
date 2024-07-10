import React, { useState } from 'react'
import editIcon from '../../../../assets/icons/edit.png';
import './SenderInfoField.css';

export const SenderInfoField = ({setNewSenderInfoHandler, name, senderInfo}) => {
    const [editImage, setEditImage] = useState(false);
    const [editable, setEditable] = useState(false);
  return (
    <div  
        className='sender-info'
        contentEditable={editable}
        name={name}
        onMouseEnter={() => setEditImage(prev => !prev)}
        onMouseLeave={() => setEditImage(prev => !prev)}
        onInput={(e) => setNewSenderInfoHandler(e, name)}

    >
       {senderInfo}
        {editImage && 
            <img 
                className="sender-info__edit-icon" 
                src={editIcon} 
                alt="edit" 
                onClick={() => setEditable(prev => !prev)}
            />
        }
    </div>
  )
}
