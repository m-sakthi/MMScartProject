import Image from './image';

const Avatar = ({ user, isOnline, isLoading, onClick, classes = '' }) => {
  if (isLoading) {
    return (
      <div className="avatar">
        <svg className="avatar-img placeholder-img" width="100%" height="100%"
          xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice" focusable="false">
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
      <Image src={user.avatar} fallbackSrc="/images/default-image.svg" alt="#" className="avatar-img" />
      : <span className="avatar-text">{user.initials}</span>}
  </div>

  return (
    onClick ? <a href='#' onClick={onClickHandler}>{avatar}</a> : avatar
  )
}

export default Avatar;