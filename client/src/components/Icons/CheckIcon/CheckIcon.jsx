import React from 'react'
import { useTheme } from '../../../context/ThemeContext'

export const CheckIcon = ({w, h, func}) => {
    const { theme } = useTheme();
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            width={w ? w : 25}
            height={h ? h : 25}
            onClick={func}
            style={{cursor: 'pointer'}}
        >
            <path
                stroke={theme === 'light' ? 'var(--white)' : 'var(--purple)'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12.611L8.923 17.5 20 6.5"
            ></path>
        </svg>
    )
}
