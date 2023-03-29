import styled from '@emotion/styled';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.white_900};
  background-color: ${({ theme }) => theme.colors.red_900};
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

    top: 0.2rem;
    right: 0.3rem;
  }
`;

export { BadgeContainer, Super };
