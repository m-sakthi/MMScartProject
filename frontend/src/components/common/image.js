import { useState } from "react";

const Image = ({ src, fallbackSrc, alt, width, height, className, ...props }) => {
  // this state is required since the fallback image can also fail
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc ? imgSrc : fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={onError}
      {...props}
    />
  )
}

export default Image