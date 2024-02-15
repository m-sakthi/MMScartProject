// import MessageAction from './message-action';

const MessageItem = ({ message }) => {
  return (
    <div className="message-content">
      <div className="message-text">
        <span className="message-text-content">{message.txt}</span>
        <span className="extra-small text-muted messsage-footer-content">{message.createdTime}</span>
      </div>

      {/* <!-- Dropdown --> */}
      {/* <MessageAction /> */}
    </div>
  )
};

export default MessageItem;