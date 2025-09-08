import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_API_URL, {
            auth: { userId },
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
    }
    return socket;
};

export const getSocket = () => socket;
