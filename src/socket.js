import { io } from "socket.io-client";
const server = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";
export const useSocketIO = () => {
  const socket = io(server);
  return {
    socket,
  };
};
