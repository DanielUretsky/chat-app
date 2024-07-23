import { useTheme } from './context/ThemeContext';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components/routes/ProtectedRoute';

import { Registration } from './pages/Registration/Registration';
import { Login } from './pages/Login/Login';
import { NotFound } from './pages/NotFound/NotFound';

import { Layout } from './pages/Home/Layout';
import { Chat } from './pages/Chat/Chat';

import './App.css'

function App() {
  const { theme } = useTheme();
  console.log('app', theme);
  return (
    <div className={`app-container ${theme === 'light' && 'app-container__light'}`}>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/chat' element={<Chat />} />
        </Route>
        <Route path='registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
