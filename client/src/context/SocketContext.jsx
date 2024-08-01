import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useSelector(state => state.user.user);


    useEffect(() => {
        if (user) {
            const socket = io.connect('http://localhost:4080');
            setSocket(socket);

            return () => socket.close();

        }
        else {
            if (socket && !user) {
                socket.close();
                setSocket(null);
            }
        }

    }, [user])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}