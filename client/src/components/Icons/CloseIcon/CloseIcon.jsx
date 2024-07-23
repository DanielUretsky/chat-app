import { useTheme } from '../../../context/ThemeContext';

export const CloseIcon = ({className, closeFunc}) => {
    const { theme } = useTheme();
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={25} 
        height={25} 
        fill="none" 
        viewBox="0 0 24 24"
        className={className}
        onClick={closeFunc}
    >
      <path
        fill={theme === 'light' ? 'var(--blue)' : 'var(--purple'}
        d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"
      ></path>
    </svg>
  )
}
