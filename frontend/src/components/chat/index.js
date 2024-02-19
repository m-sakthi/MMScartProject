import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Image } from 'react-bootstrap';

import { socket } from '../../socket';
import MessagesList from './message';
// import { findOrCreateAdminChannel, getMessages, newMessageReceived } from '../../actions/messageActions';

export default function () {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authState);
  const { adminChannel } = useSelector((state) => state.channelState);
  const { messages } = useSelector((state) => state.messageState);
  const [isloading, setIsLoading] = useState(false);
  const [chatColapsed, setChatColapsed] = useState(true);
  const txtRef = useRef();
  const formRef = useRef();

  const messageCallback = () => {
    formRef.current.reset();
    setIsLoading(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (txtRef.current.value) {
      const params = {
        txt: txtRef.current.value,
        channel: adminChannel._id
      };
  
      setIsLoading(true);
      socket.timeout(2000).emit('send-message', params, messageCallback);
    }
  };

  // const handleMessageResponse = (response) => {
  //   dispatch(newMessageReceived(response));
  // }

  // useEffect(() => {
  //   if (!adminChannel && user.role !== 'admin') {
  //     dispatch(findOrCreateAdminChannel);
  //   } else {
  //     dispatch(getMessages(adminChannel._id));
  //   }
  //   socket.on('message-response', handleMessageResponse);
  //   socket.on('new-message-received', handleMessageResponse);
    
  // }, []);


  const handleHeaderClick = () => {
    setChatColapsed(!chatColapsed);
  }

  return (
    <div className={`chatContainer ${chatColapsed ? 'chatContainerCollapsed' : ''}`}>
      <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
        <MDBCardHeader onClick={handleHeaderClick} className="d-flex justify-content-between align-items-center p-3 hoverPointer">
          <h5 className="mb-0">Chat</h5>
        </MDBCardHeader>
        <MessagesList currentUser={user} messages={messages} />
        <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
          <div className='avatar'>
            <Image src={user.avatar ?? './images/default_avatar.png'} />
          </div>
          <form
            ref={formRef}
            onSubmit={onSubmitHandler}
            className="d-flex container-fluid justify-content-start align-items-center">
            <input
              type="text"
              name="message"
              ref={txtRef}
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Type message"
              disabled={isloading}
            />
            {/* <a className="ms-3 text-muted" href="#!">
              <MDBIcon fas icon="paperclip" />
            </a>
            <a className="ms-3 text-muted" href="#!">
              <MDBIcon fas icon="smile" />
            </a> */}
            <button type="submit" disabled={isloading} className="ms-3 no-border">
              <MDBIcon fas icon="paper-plane" />
            </button>
          </form>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}