import styled from '@emotion/styled';
import { Image as ImageComponent } from '@/components/base';
import { useEffect, useState } from 'react';

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

const ShapeToCssValue = {
  circle: '50%',
  round: '0.4rem',
  square: '0',
};

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: #eee;
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

// Avatar.defaultProps = {
//   __TYPE: 'Avatar',
// };

// Avatar.propTypes = {
//   __TYPE: PropTypes.oneOf(['Avatar']),
// };

export default Avatar;
