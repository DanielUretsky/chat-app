import { useEffect } from 'react'
import ReactDom from 'react-dom'

import './ModalRoot.css';

export const ModalRoot = ({ children }) => {
    useEffect(() => {
        return () => {
            
        }
    })
    return ReactDom.createPortal(
        <div className='modal-container'>
            {children}
        </div>,
        document.getElementById('modal-root')
    )
}
