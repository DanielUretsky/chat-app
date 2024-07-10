import React, { useEffect } from 'react'
import ReactDom from 'react-dom'

import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

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
