import { Modal } from '@/components/base';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

export const HamburgerModal = styled(Modal)`
  padding: 1.2rem;
  position: absolute;
  top: 7rem;
  right: 2rem;
  transform: none;

  background-color: ${theme.colors.white_900};
  border-radius: 0.4rem;
  box-sizing: border-box;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  @media (min-width: 991.98px) {
    display: none;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  font-size: 1.4rem;

  width: 10rem;
  padding: 1rem;
  border-radius: 0.4rem;

  cursor: pointer;

  :hover {
    background-color: ${theme.colors.whiteGray_800};
    font-weight: bold;
  }
`;
