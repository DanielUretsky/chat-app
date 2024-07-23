import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';

import { AnimatePresence, motion, } from 'framer-motion';

import { searchContacts } from '../../../../services/userService';
import { ContactItem } from './ContactItem/ContactItem';

import { growFromBottom } from '../../../../utils/animationVariants';
import { InputLoader } from '../../../Loaders/InputLoader';
import './SideBarSearch.css';
import { useSelector } from 'react-redux';

export const SideBarSearch = () => {
    const { theme } = useTheme();
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contactsValue, setContactsValue] = useState("");
    const [contacts, setContacts] = useState([]);

    const currentUser = useSelector(state => state.user.user);
    const searchBlockRef = useRef(null);
  
    useEffect(() => {
        const getData = setTimeout(async () => {
            setLoading(true);
            if (contactsValue !== "") {
                const data = await searchContacts(contactsValue);
                const filteredData = data.filter(contact => contact._id !== currentUser._id);

                setContacts(filteredData);
                setLoading(false);
            }
        }, 700)

        return () => {
            setContacts([]);
            clearTimeout(getData);
        };


    }, [contactsValue])

    const searchBlockToggle = () => {
        if (focus) return;
        setFocus(prev => !prev);
       
    }

    useEffect(() => {
        const outsideClickHandler = (e) => {
            if (searchBlockRef.current &&
                !searchBlockRef.current.contains(e.target)
            ) {
                setFocus(prev => !prev);
            }
        }

        if (focus) document.addEventListener('mousedown', outsideClickHandler);
        else document.removeEventListener('mousedown', outsideClickHandler);

        return () => {
            document.removeEventListener('mousedown', outsideClickHandler)
        };
    }, [focus]);

    return (
        <div className={`side-bar-search ${theme === 'light' && 'side-bar-search__light'}`}>
            <input
                type="search"
                className={`search-chat ${theme === 'light' && 'search-chat__light'}`}

                placeholder='Search contact'
                onChange={(e) => setContactsValue(e.target.value)}
                onClick={(e) => searchBlockToggle(e)}

            />
            <AnimatePresence>
            
                {focus &&
                    <motion.div
                        ref={searchBlockRef}
                        className={`contacts-container ${theme === 'light' && 'contacts-container__light'}`}
                        variants={growFromBottom}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {loading && <InputLoader w={75} h={30}/>}
                        {contacts?.map(contact => {
                            return <ContactItem 
                                        key={contact._id} 
                                        contact={contact} 
                                        setFocus={setFocus}
                                    />
                        })}
                    </motion.div>

                }
            </AnimatePresence>
        </div>
    )
}
