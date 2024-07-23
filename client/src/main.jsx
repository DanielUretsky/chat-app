import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

import { SocketContextProvider } from './context/SocketContext.jsx';
import App from './App.jsx'

import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <SocketContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SocketContextProvider>
    </BrowserRouter>
  </Provider>,
)
