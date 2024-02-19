import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

// import { socketInit } from '../../socket';
import TextareaAutosize from 'react-textarea-autosize';
import { newMessageReceived } from '../../actions/messageActions';

const ChatForm = ({ socketObj, loadingMessages }) => {
  const { selectedChannel } = useSelector((state) => state.channelState);
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const txtRef = useRef();
  const formRef = useRef();

  // const scrollToNewMessage = () => {
  //   const ele = document.getElementById("messages-list");
  //   ele.scrollIntoView({ behavior: "smooth", block: "end" });
  // }

  const messageCallback = () => {
    formRef.current.reset();
    setIsLoading(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (txtRef.current.value) {
      const params = {
        txt: txtRef.current.value,
        channel: selectedChannel.id
      };

      setIsLoading(true);
      socketObj.timeout(5).emit('send-message', params, messageCallback);
    }
  };

  const handleMessageReceived = (response) => {
    dispatch(newMessageReceived(response));
  }

  const handleMessageSent = (response) => {
    dispatch(newMessageReceived(response));
  }

  useEffect(() => {
    if (socketObj) {
      socketObj.on('new-message-sent', handleMessageSent);
      socketObj.on('new-message-received', handleMessageReceived);
    }
  }, [socketObj]);

  return (
    <div className="chat-footer pb-3 pb-lg-4">
      {/* <!-- Chat: Files --> */}
      {/* <div className="dz-preview bg-dark dz-preview-moved pb-10 pt-3 px-2" id="dz-preview-row" data-horizontal-scroll="">
        <div className="theme-file-preview position-relative mx-2 dz-processing dz-image-preview dz-error dz-complete">
          <div className="avatar avatar-lg dropzone-file-preview">
            <span className="avatar-text rounded bg-secondary text-body file-title" title="earth-map.jpeg">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z">
                </path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </span>
          </div>
          <div className="avatar avatar-lg dropzone-image-preview">
            <img src="" className="avatar-img rounded file-title" data-dz-thumbnail="" alt="earth-map.jpeg" title="earth-map.jpeg" />
          </div>
          <a className="badge badge-circle bg-body text-white position-absolute top-0 end-0 m-2" href="#" data-dz-remove="">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
        </div>
      </div> */}
      {/* <!-- Chat: Files --> */}

      {/* <!-- Chat: Form --> */}
      <form
        ref={formRef}
        data-emoji-form=""
        onSubmit={onSubmitHandler}
        className="chat-form rounded-3 bg-dark"
      >
        <fieldset disabled={selectedChannel.status !== 'active'} className="row align-items-end gx-0">
          {/* <div className="col-auto">
            <a href="#" className="btn btn-icon btn-link text-body rounded-circle dz-clickable" id="dz-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </a>
          </div> */}

          <div className="col pl-2">
            <div className="input-group">
              <TextareaAutosize
                maxRows={5}
                ref={txtRef}
                disabled={loadingMessages || isloading}
                className="form-control px-0 ms-4"
                placeholder="Type your message..."
                style={{ overflowWrap: 'breakWord', resize: 'none', overflow: 'hidden' }} />

              {/* <a href="#" className="input-group-text text-body pe-0" data-emoji-btn="">
                <span className="icon icon-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </span>
              </a> */}
            </div>
          </div>

          <div className="col-auto">
            <button disabled={loadingMessages || isloading} className="btn btn-icon btn-primary rounded-3 ms-5">
              {isloading
                ? <svg className="spinner-border" viewBox="0 0 50 50">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              }
            </button>
          </div>
        </fieldset>
      </form>
      {/* <!-- Chat: Form --> */}
    </div>
  )
}

export default ChatForm