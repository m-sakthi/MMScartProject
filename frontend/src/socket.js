import { io } from 'socket.io-client';

export const socketInit = () => io('ws://localhost:3000', {
  query: {
    key: localStorage.getItem('jwttoken'),
  },
});