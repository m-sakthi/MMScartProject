import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../actions/messageActions';

import ChatHeader from './chat-header';
import MessagesList from './messages-list';
import ChatForm from './chat-form';

const MessagesPage = ({ latestMessage, isLoading }) => {
  const { loadingChannels, selectedChannel } = useSelector((state) => state.channelState);
  const { messages, socketObj, loading: loadingMessages } = useSelector((state) => state.messageState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedChannel) {
      dispatch(getMessages(selectedChannel.id));
    }
  }, [selectedChannel]);

  return (
    <main className="main is-visible" data-dropzone-area="">
      <div className="container h-100">
        {selectedChannel ? <div className="d-flex flex-column h-100 position-relative">
          <ChatHeader currentUser={user} recepient={selectedChannel.recepient} latestMessage={latestMessage} isLoading={isLoading} />
          <MessagesList currentUser={user} recepient={selectedChannel.recepient} messages={messages} />
          <ChatForm socketObj={socketObj} loadingMessages={loadingMessages || loadingChannels} selectedChannel={selectedChannel} />
        </div> : null}
      </div>
    </main>
  )
}

export default MessagesPage;


// const groupedMessages={[{
//   sender: 1,
//   lastsentAt: '08:48 PM',
//   messages: [{
//     txt: 'Hey, Marshall! How are you? Can you please change the color theme of the website to pink and purple?',
//     createdAt: '08:45 PM',
//     sender: 1
//   }, {
//     txt: 'Send me the files please.',
//     createdAt: '08:46 PM',
//     sender: 1
//   }]
// }, {
//   sender: 2,
//   lastsentAt: '08:49 PM',
//   messages: [{
//     txt: 'Hey, Marshall! How are you? Can you please change the color theme of the website to pink and purple?',
//     createdAt: '08:42 PM',
//     sender: 2
//   }, {
//     txt: 'Send me the files please.',
//     createdAt: '08:41 PM',
//     sender: 2
//   }]
// }]}