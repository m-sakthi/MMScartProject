import { useEffect } from 'react';
import EmptyMessageList from './empty-message-list';
import MessageGroup from './message-group';

const MessagesList = ({ currentUser, messages }) => {

  const scrollToNewMessage = () => {
    const ele = document.getElementById("messages-list");
    ele.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    if (messages.length) {
      scrollToNewMessage();
    }
  }, [messages.length]);

  return (
    <div className="chat-body hide-scrollbar flex-1 h-100">
      {!messages.length
        ? <EmptyMessageList />
        : <div className="chat-body-inner" >
          <div id="messages-list" className="py-3 py-lg-4">
            {messages.map(msg => (
              <MessageGroup
                key={msg._id}
                message={msg}
                sender={msg.sender}
                currentUser={currentUser} />
            ))}
          </div>
        </div>}
    </div>
  )
}

export default MessagesList;