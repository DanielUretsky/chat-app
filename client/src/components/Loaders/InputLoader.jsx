import React from 'react';

import './InputLoader.css';

export const InputLoader = ({w, h}) => {
  return (
    <div 
        style={{width: w + 'px', height: h + 'px'}} 
        className='loader'>
    </div>
  )
}
