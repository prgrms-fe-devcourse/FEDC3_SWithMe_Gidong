import { Image as ImageComponent } from '@/components/base';
import { useEffect, useState } from 'react';
import { AvatarWrapper } from './styles';
import PropTypes from 'prop-types';
import { imgDefaultAvatar } from '@/assets/images';
import { SizeToCssValue } from './styles';

function Avatar({
  lazy,
  threshold,
  src = imgDefaultAvatar,
  size = 'small',
  shape = 'circle',
  placeholder,
  alt,
  mode = 'cover',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape} size={size}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={SizeToCssValue[size]}
        height={SizeToCssValue[size]}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1.0 : 0 }}
      />
    </AvatarWrapper>
  );
}

Avatar.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  shape: PropTypes.oneOf(['circle', 'round', 'square']),
  placeholder: PropTypes.string,
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['cover', 'fill', 'contain', 'none', 'scale-down']),
};

export default Avatar;
