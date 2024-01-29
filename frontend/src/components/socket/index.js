import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { saveSocketDetail } from '../../actions/messageActions';

export default function () {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);

      console.log('******* socket.id :: ', socket.id);
      dispatch(saveSocketDetail(socket.id));
    }

    function onDisconnect() {
      setIsConnected(false);
      dispatch(saveSocketDetail(null));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
  
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <p>State: { isConnected ? 'Connected' : 'Disconnected' }</p>
  );
}