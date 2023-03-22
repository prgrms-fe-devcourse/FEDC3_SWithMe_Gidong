import { Image as ImageComponent } from '@/components/base';
import { useEffect, useState } from 'react';
import { AvatarWrapper } from './styles';

function Avatar({ lazy, threshold, src, size = 1, shape = 'circle', placeholder, alt, mode = 'cover', ...props }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1.0 : 0 }}
      />
    </AvatarWrapper>
  );
}

export default Avatar;
