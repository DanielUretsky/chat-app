import React from 'react'

export const Input = ({
    className,
    type = "text",
    name,
    text,
    setUserInfoHandleChange,
    children,
    value
}) => {
    return (
        <div className={className}>
            <label htmlFor={name}>{text}</label>
            {children}
            <input type={type} name={name} onChange={setUserInfoHandleChange} value={value && value}/>
        </div>
    )
}
