import { useTheme } from '../../../../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleIn } from '../../../../utils/animationVariants';

import './ThemeToggle.css';

export const ThemeToggle = () => {
    const { theme, themeToggle } = useTheme();

    return (
        <div onClick={themeToggle} className='theme-toggle__wrapper'>
            {theme === "light" ?
                <AnimatePresence>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 256 256"
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <path
                            className={`theme-toggle ${theme === 'light' && 'theme-toggle__light'}`}
                            strokeMiterlimit="10"
                            strokeWidth="1"
                            d="M46.715 90a45.26 45.26 0 01-11.717-1.552C23.391 85.337 13.69 77.893 7.682 67.487 1.674 57.08.077 44.957 3.188 33.349c3.11-11.607 10.554-21.308 20.961-27.316C32.75 1.066 42.498-.89 52.342.374a3 3 0 011.21 5.517 30.316 30.316 0 00-10.188 40.996A30.315 30.315 0 0083.96 58.56a3 3 0 014.172 3.807c-3.826 9.156-10.395 16.621-18.997 21.586C62.204 87.955 54.509 90 46.715 90zM43.74 6.101c-5.805.421-11.436 2.15-16.592 5.127-9.019 5.207-15.47 13.614-18.166 23.674-2.695 10.059-1.312 20.567 3.895 29.586 5.207 9.019 13.614 15.471 23.673 18.165 10.058 2.697 20.567 1.311 29.585-3.895 5.156-2.977 9.47-6.989 12.737-11.806-15.547 4.094-32.303-2.515-40.705-17.066-8.399-14.55-5.74-32.368 5.573-43.785z"
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"

                        ></path>
                    </motion.svg>
                </AnimatePresence>
                :
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"

                    viewBox="0 0 256 256"
                    className={`theme-toggle ${theme === 'light' && 'theme-toggle__light'}`}
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <g strokeMiterlimit="10" strokeWidth="1">
                        <path
                            d="M88 47H77.866a2 2 0 010-4H88a2 2 0 010 4zM12.134 47H2a2 2 0 010-4h10.134a2 2 0 010 4zM45 14.134a2 2 0 01-2-2V2a2 2 0 014 0v10.134a2 2 0 01-2 2zM45 90a2 2 0 01-2-2V77.866a2 2 0 014 0V88a2 2 0 01-2 2zM75.405 77.405a1.992 1.992 0 01-1.414-.586l-7.166-7.166a2 2 0 112.828-2.828l7.166 7.166a2 2 0 01-1.414 3.414zM21.76 23.76a1.99 1.99 0 01-1.414-.586l-7.166-7.166a2 2 0 112.828-2.828l7.166 7.166a2 2 0 01-1.414 3.414zM68.239 23.76a2 2 0 01-1.414-3.414l7.166-7.166a2 2 0 112.828 2.828l-7.166 7.166a1.99 1.99 0 01-1.414.586zM14.594 77.405a2 2 0 01-1.414-3.414l7.166-7.166a2 2 0 112.828 2.828l-7.166 7.166a1.99 1.99 0 01-1.414.586zM45 66.035c-11.599 0-21.035-9.437-21.035-21.035S33.401 23.965 45 23.965 66.035 33.401 66.035 45 56.599 66.035 45 66.035zm0-38.07c-9.393 0-17.035 7.642-17.035 17.035 0 9.394 7.642 17.035 17.035 17.035 9.394 0 17.035-7.642 17.035-17.035S54.394 27.965 45 27.965z"
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"

                        ></path>
                    </g>
                </motion.svg>
            }

        </div>
    )
}
