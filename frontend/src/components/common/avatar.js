import Image from './image';

const Avatar = ({ user, isOnline, isLoading, onClick, classes = '' }) => {
  if (!user) return null;
  if (isLoading) {
    return (
      <div className="avatar">
        <svg
          width="100%"
          height="100%"
          role="img"
          focusable="false"
          aria-label="Placeholder"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="avatar-img placeholder-img">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
        </svg>
      </div>
    )
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    onClick();
  }

  const avatar = <div className={`avatar${isOnline ? ' avatar-online' : ''} ${classes}`}>
    {/* avatar-offline */}
    {user.avatar ?
      <Image src={user.avatar} fallbackSrc="/images/default-avatar.svg" alt="#" className="avatar-img" />
      : <span className="avatar-text">{user.initials}</span>}
  </div>

  return (
    onClick ? <a href='#' onClick={onClickHandler}>{avatar}</a> : avatar
  )
}

export default Avatar;