import styled from '@emotion/styled';

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
  border: 1px solid ${({ theme }) => theme.colors.white_100};
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white_400};
  width: ${({ size }) => SizeToCssValue[size]};
  height: ${({ size }) => SizeToCssValue[size]};
  flex: none;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

export { AvatarWrapper };
