import ChatListSidebar from '../channels';
import MessagesPage from './messages-page';

const Messages = () => {

  return (
    <div className="layout overflow-hidden">
      <ChatListSidebar />
      <MessagesPage />
    </div>
  );
};

export default Messages;