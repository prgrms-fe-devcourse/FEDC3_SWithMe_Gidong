import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';

const ShapeToCssValue = {
  circle: '50%',
  round: '0.4rem',
  square: '0',
};

export const SizeToCssValue = {
  small: '3rem',
  medium: '4rem',
  large: '23rem',
};

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid ${COLOR.AVATAR_WRAPPER_BORDER};
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: ${COLOR.AVATAR_WRAPPER_BG};
  width: ${({ size }) => SizeToCssValue[size]};
  height: ${({ size }) => SizeToCssValue[size]};
  flex: none;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

export { AvatarWrapper };
