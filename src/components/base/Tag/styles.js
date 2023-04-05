import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const DefaultWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledTagListWrapper = styled(DefaultWrapper)`
  justify-content: center;
  margin: 1rem 0;
  padding: 1rem;
  border: 0.2rem solid rgba(0, 0, 0, 0.3);
  border-radius: 1rem;

  border-color: ${({ disabled }) => (disabled ? 'none' : COLOR.PRIMARY_BTN)};
`;

const StyledTagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.3rem;
  padding: 0.5rem;
  background-color: ${COLOR.PRIMARY_BTN};
  border-radius: 0.4rem;

  &:nth-of-type(1) {
    margin: 0 0.3rem 0 0;
  }

  & button {
    padding-left: 1rem;
  }
`;

export { DefaultWrapper, StyledTagListWrapper, StyledTagItem };
