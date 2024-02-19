import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socketInit } from '../../socket';
import { saveSocketDetail } from '../../actions/messageActions';

export default function () {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const socket = socketInit();

    function onConnect() {
      setIsConnected(true);
      dispatch(saveSocketDetail(socket));
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

  return null;
  
  // (
  //   <p>State: { isConnected ? 'Connected' : 'Disconnected' }</p>
  // );
}