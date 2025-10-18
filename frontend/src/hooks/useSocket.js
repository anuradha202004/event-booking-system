import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(url);

        return () => {
            socketRef.current.disconnect();
        };
    }, [url]);

    const emit = (event, data) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    };

    const on = (event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    };

    return { emit, on };
};

export default useSocket;