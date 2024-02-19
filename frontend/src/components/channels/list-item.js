import Avatar from "../common/avatar";

const ItemHeader = ({ user, latestMessage, isLoading }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      {isLoading ?
        <h5 className="placeholder-glow w-100 mb-0">
          <span className="placeholder col-5"></span>
        </h5>
        : <>
          <h5 key={user.id} className="me-auto mb-0">{user.name}</h5>
          {latestMessage ? <span key={latestMessage.id} className="text-muted extra-small ms-2">{latestMessage?.createdTime}</span> : null}
        </>}
    </div>
  );
};

const ChannelsListItem = ({ channel, currentUser, recepient, latestMessage, inviteAcceptHandler, setSelectedChannel, isLoading }) => {
  return (
    <a key={recepient?.id} href='#' className="card border-0 text-reset" onClick={setSelectedChannel}>
      <div className="card-body">
        <div className="row gx-5">
          <div className="col-auto">
            <Avatar
              user={recepient}
              isLoading={isLoading}
              isOnline={recepient?.isOnline}
            />
          </div>

          <div className="col">
            <ItemHeader user={recepient} latestMessage={latestMessage} isLoading={isLoading} />

            {isLoading ?
              <div className="placeholder-glow">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-8"></span>
              </div>
              : <div className="d-flex align-items-center">
                <div className="line-clamp me-auto">
                  {channel.status === 'invited' &&
                    <span className="text-muted fs-6">
                      {channel.createdBy === currentUser.id ?
                        'You can start conversation once your invite has been accepted' :
                        'Sent you a chat request.'}
                    </span>}
                  {channel.status === 'active' ? latestMessage ? latestMessage.txt : '' : null}
                </div>

                {/* <div className="badge badge-circle bg-primary ms-5">
                  <span>{newMessageCount}</span>
                </div> */}
              </div>}
          </div>
        </div>
      </div>

      {channel.status === 'invited' && channel.createdBy !== currentUser.id && <div className="card-footer">
        <div className="row gx-4">
          {/* <div className="col">
            <a href="#" className="btn btn-sm btn-soft-primary w-100">Hide</a>
          </div> */}
          <div className="col">
            <button className="btn btn-sm btn-primary w-100" onClick={inviteAcceptHandler}>Accept Invite</button>
          </div>
        </div>
      </div>}

      {/* {channelsFail.type === 'group' ?
        <div className="card-footer">
          <div className="row align-items-center gx-4">
            <div className="col-auto">
              <div className="avatar avatar-xs">
                <img className="avatar-img" src="assets/img/avatars/bootstrap.svg" alt="Bootstrap Community" />
              </div>
            </div>

            <div className="col">
              <h6 className="mb-0">Bootstrap Community</h6>
            </div>

            <div className="col-auto">
              <div className="avatar-group">
                <div className="avatar avatar-xs">
                  <img src="assets/img/avatars/12.jpg" alt="#" className="avatar-img" />
                </div>

                <div className="avatar avatar-xs">
                  <img src="assets/img/avatars/11.jpg" alt="#" className="avatar-img" />
                </div>

                <div className="avatar avatar-xs">
                  <img src="assets/img/avatars/9.jpg" alt="#" className="avatar-img" />
                </div>

                <div className="avatar avatar-xs">
                  <span className="avatar-text">+5</span>
                </div>
              </div>
            </div>
          </div>
        </div> : null} */}
    </a>
  )
}

export default ChannelsListItem;