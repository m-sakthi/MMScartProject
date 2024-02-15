import MessageItem from './message-item';
import Avatar from '../common/avatar';

const MessageGroup = ({ message, currentUser, sender }) => {
  return (
    <div className={`message${currentUser.id === sender ? ' message-out' : ''}`}>
      {/* <a href="#" data-bs-toggle="modal" data-bs-target="#modal-user-profile" className="avatar avatar-responsive">
        <Avatar user={currentUser} />
      </a> */}

      <div className="message-inner">
        <div className="message-body">
          {/* {messages.map(message => <MessageItem key={message.createdAt} message={message} />)} */}
          <MessageItem key={message.id} message={message} />
        </div>

       {/* <div className="message-footer">
          <span  className="extra-small text-muted">08:45 PM</span>
        </div> */}
      </div>
    </div>
  )
}

export default MessageGroup;