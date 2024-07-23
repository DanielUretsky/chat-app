import { useTheme } from '../../../context/ThemeContext';

export const DropDownIcon = ({ className, dropdDownFunc }) => {
    const {theme} = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={className}
            onClick={dropdDownFunc}
        >
            <g>
                <path fill='none' d="M0 0H24V24H0z"></path> 
                <path 
                    fill={`${theme === 'light' ? 'var(--white)' : 'var(--purple)'}`} 
                    d="M7 10l5 7 6-7">
                </path>
            </g>
        </svg>
    )
}
