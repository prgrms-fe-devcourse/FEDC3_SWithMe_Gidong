import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledLikeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: fixed;
  right: 6rem;
  bottom: 6rem;
  z-index: 2000;

  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${COLOR.WHITE};
  box-shadow: 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;

export { StyledLikeButtonContainer };
