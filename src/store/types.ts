import {Message, User} from "@/types";
import 'socket.io-client';

export interface RootState {
  user: User | null;
  socket: SocketIOClient.Socket | null;
  messages: Message[];
  onlineUsers: User[];
}
