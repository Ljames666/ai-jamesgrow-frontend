import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const createSocket = (token: string): Socket => {
    if (!socketInstance) {
        socketInstance = io(process.env.NEXT_PUBLIC_API_URL!, {
            auth: {
                token: `Bearer ${token}`,
            },
            autoConnect: true,
        });
    }
    return socketInstance;
};
