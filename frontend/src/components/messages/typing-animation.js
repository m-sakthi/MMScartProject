const TypingAnimation = ({ isTyping }) => {
  return (
    isTyping ?
      <span className="text-truncate">is typing<span className="typing-dots">
        <span>.</span><span>.</span><span>.</span>
      </span></span>
      : null
  )
}

export default TypingAnimation;