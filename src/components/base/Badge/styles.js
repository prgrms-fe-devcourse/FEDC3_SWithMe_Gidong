import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledBadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledSuper = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  border-radius: 2rem;
  color: white;
  background-color: ${COLOR.RED};
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

export { StyledBadgeContainer, StyledSuper };
