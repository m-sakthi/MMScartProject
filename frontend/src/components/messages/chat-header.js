import { useDispatch } from 'react-redux';

import Avatar from '../common/avatar';
import TypingAnimation from './typing-animation';
import { openProfileModal } from '../../slices/layoutSlice';

const ChatHeader = ({ currentUser, recepient, isLoading }) => {
  const dispatch = useDispatch();

  return (
    <div className="chat-header border-bottom py-4 py-lg-7">
      <div className="row align-items-center">
        {/* <!-- Mobile: close --> */}
        {/* <div className="col-2 d-xl-none">
          <a className="icon icon-lg text-muted" href="#" data-toggle-chat="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
        </div> */}
        {/* <!-- Mobile: close --> */}

        {/* <!-- Content --> */}
        <div className="col-8 col-xl-12">
          <div className="row align-items-center text-center text-xl-start">
            {/* <!-- Title --> */}
            <div className="col-12 col-xl-6">
              <div className="row align-items-center gx-5">
                <div className="col-auto">
                  <Avatar
                    classes='d-none d-xl-inline-block'
                    user={recepient}
                    isLoading={isLoading}
                    // isOnline={recepient.isOnline}
                    onClick={() => dispatch(openProfileModal())}
                  />
                </div>

                <div className="col overflow-hidden">
                  <h5 className="text-truncate">{recepient.name}</h5>
                  <TypingAnimation isTyping={false} />
                </div>
              </div>
            </div>
            {/* <!-- Title --> */}

            {/* <!-- Toolbar --> */}
            <div className="col-xl-6 d-none d-xl-block">
              <div className="row align-items-center justify-content-end gx-6">
                <div className="col-auto">
                  <a href="#" className="icon icon-lg text-muted" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more" aria-controls="offcanvas-more">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </a>
                </div>

                <div className="col-auto">
                  <div className="avatar-group">
                    <Avatar
                      classes='avatar-sm'
                      user={currentUser}
                      isLoading={isLoading}
                    />
                    <Avatar
                      classes='avatar-sm'
                      user={recepient}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Toolbar --> */}
          </div>
        </div>
        {/* <!-- Content --> */}

        {/* <!-- Mobile: more --> */}
        {/* <div className="col-2 d-xl-none text-end">
          <a href="#" className="icon icon-lg text-muted" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more" aria-controls="offcanvas-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </a>
        </div> */}
        {/* <!-- Mobile: more --> */}
      </div>
    </div>
  );
};

export default ChatHeader;