import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion, } from 'framer-motion';

import { searchContacts } from '../../../../services/userService';
import { ContactItem } from './ContactItem/ContactItem';

import { growFromBottom } from '../../../../utils/animationVariants';
import { InputLoader } from '../../../Loaders/InputLoader';
import './SideBarSearch.css';

export const SideBarSearch = () => {
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contactsValue, setContactsValue] = useState("");
    const [contacts, setContacts] = useState([]);
    const searchBlockRef = useRef(null);
  
    useEffect(() => {
        const getData = setTimeout(async () => {
            setLoading(true);
            if (contactsValue !== "") {
                const data = await searchContacts(contactsValue)
                setContacts(data);
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
        <div className="side-bar-search">
            <input
                type="search"
                className='search-chat'

                placeholder='Search contact'
                onChange={(e) => setContactsValue(e.target.value)}
                onClick={(e) => searchBlockToggle(e)}

            />
            <AnimatePresence>

                {focus &&
                    <motion.div
                        ref={searchBlockRef}
                        className="contacts-container"
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
