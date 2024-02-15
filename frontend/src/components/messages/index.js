import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../template.css';

import { getMessages } from '../../actions/messageActions';
import ChatListSidebar from '../channels';
import MessagesPage from './messages-page';

// const currentUser = { _id: 1, name: 'William Wright', initials: 'WR', isOnline: true },
//   recepient = { _id: 2, name: 'Ollie Chandler', initials: 'OC', isOnline: true },
//   latestMessage = { txt: "Hello! Yeah, I'm going to meet my friend of mine at the departments stores now.", createdAt: '12:45 PM' },
//   isLoading = false;

const Messages = () => {
  const { selectedChannel } = useSelector((state) => state.channelState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedChannel) {
      dispatch(getMessages(selectedChannel.id));
    }
  }, [selectedChannel]);

  return (
    <div className="layout overflow-hidden">
      <ChatListSidebar />
      <MessagesPage />
    </div>
  );
};

export default Messages;