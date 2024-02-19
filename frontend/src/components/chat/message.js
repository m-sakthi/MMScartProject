import {
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Image } from 'react-bootstrap';

const Time = ({ dateStr, color }) => {
  return (
    <span className={`chat-time ${color}`}>
      {(new Date(dateStr)).toLocaleTimeString().slice(0, 5)}
    </span>
  );
}

const MessageItem = ({ isSenderCurrentUser, createdAt, txt }) => {
  return (
    <div className={`d-flex break-all-word rounded-3 ${isSenderCurrentUser ? 'me-2 text-white bg-primary' : 'ms-2 chat-bubble-light-bg'}`}>
      <p className="chat-bubble rounded-3 relative">
        <span className="chat-message">{txt}</span>
        <Time dateStr={createdAt} color={isSenderCurrentUser ? 'text-white' : 'text-muted'} />
      </p>
    </div>
  );
}

export default ({ currentUser, messages = [] }) => {
  return (<MDBCardBody>
    {messages.map(m => (
      <div key={m._id} className={`d-flex mb-4 pt-1 justify-content-start ${m.sender === currentUser._id ? 'flex-row-reverse' : ''}`}>
        <div className='avatar'>
          <Image src={currentUser.avatar ?? './images/default_avatar.png'} />
        </div>
        <MessageItem isSenderCurrentUser={m.sender === currentUser._id} createdAt={m.createdAt} txt={m.txt} />
      </div>))}

    <div className="d-flex flex-row justify-content-start">
      <div className='avatar'>
        <Image src={currentUser.avatar ?? './images/default_avatar.png'} />
      </div>
      <div>
        <p
          className="small p-2 ms-2 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7" }}
        >
          Hi
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted">
          23:58
        </p>
      </div>
    </div>

    <div className="divider align-items-center mb-4">
      <p
        className="text-center mx-3 mb-0"
        style={{ color: "#a2aab7" }}
      >
        Today
      </p>
    </div>

    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
      <div>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
          Hiii, I'm good.
        </p>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
          How are you doing?
        </p>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
          Long time no see! Tomorrow office. will be free on sunday.
        </p>
        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
          00:06
        </p>
      </div>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
        alt="avatar 1"
        style={{ width: "45px", height: "100%" }}
      />
    </div>
  </MDBCardBody>);
}