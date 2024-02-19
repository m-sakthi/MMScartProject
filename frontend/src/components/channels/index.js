import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Search from '../common/search';
import ListItem from './list-item';
import ListItemLoader from './list-item-loader';
import { getChannels, acceptInvite } from '../../actions/channelActions';
import { setSelectedChannel } from '../../slices/channelSlice';
import { openChatInviteModal } from '../../slices/layoutSlice';

export const List = ({ currentUser, channels, inviteAcceptHandler, _setSelectedChannel, openInviteModal }) => {
  if (channels.length === 0) {
    return (
      <div>
        <div className="d-flex flex-column h-100 justify-content-center mb-5">
          <div className="text-center mb-6">
            <span className="icon icon-xl text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
          </div>

          <p className="text-center text-muted">You do not have any conversations yet! <br /> Invite to start the conversation!</p>
        </div>

        <button
          onClick={openInviteModal}
          className='btn btn-lg btn-primary w-100 d-flex align-items-center'>
          Invite
          <span className="icon ms-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </span>
        </button>
      </div>
    )
  }

  return channels.map(channel => (
    <ListItem
      key={channel._id}
      currentUser={currentUser}
      channel={channel}
      inviteAcceptHandler={inviteAcceptHandler(channel.id)}
      setSelectedChannel={_setSelectedChannel(channel.id)}
      recepient={channel.recepient}
      latestMessage={channel.latestMessage}
      isLoading={channel.isLoading}
      newMessageCount={3}
    />
  ))
}


const ChannelsList = () => {
  const dispatch = useDispatch();
  const { channels, loadingChannels } = useSelector((state) => state.channelState);
  const { user } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(getChannels);
  }, []);

  const _setSelectedChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(setSelectedChannel(channels.find(c => c.id === id)));
  }

  const _inviteAcceptHandler = (id) => e => {
    e.preventDefault();
    dispatch(acceptInvite(id));
  }

  const openInviteModal = () => dispatch(openChatInviteModal());

  return (
    <aside className="sidebar bg-light">
      <div className="tab-content h-100" role="tablist">
        <div className="tab-pane fade h-100 show active" id="tab-content-chats" role="tabpanel">
          <div className="d-flex flex-column h-100 position-relative">
            <div className="hide-scrollbar">

              <div className="container py-8">
                <div className="mb-8 d-flex align-items-center">
                  <h2 className="fw-bold me-auto m-0">Chats</h2>

                  {channels.length > 0 ? <a href="#" onClick={openInviteModal} className="" data-bs-toggle="modal" data-bs-target="#modal-invite">
                    <span className="icon ms-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                    </span>
                  </a> : null}
                </div>

                {/* <div className="mb-6">
                  <Search placeholder="Search messages or users" />
                </div> */}

                <div className="card-list">
                  {loadingChannels ?
                    [Array(5).fill(Math.random())].map(i => <ListItemLoader key={i} />)
                    : <List
                      channels={channels}
                      currentUser={user}
                      openInviteModal={openInviteModal}
                      _setSelectedChannel={_setSelectedChannel}
                      inviteAcceptHandler={_inviteAcceptHandler}
                    />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ChannelsList;