import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000', {
  query: {
    key: localStorage.getItem('jwttoken'),
  },
});