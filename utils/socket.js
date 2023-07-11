import { io } from "socket.io-client";
const socket = io("http://172.10.5.90:443", { transports: ["websocket"] });
export default socket;
