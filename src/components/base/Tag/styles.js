import styled from '@emotion/styled';

export const DefaultWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagListWrapper = styled(DefaultWrapper)`
  justify-content: center;
  margin: 1rem 0;
  padding: 1rem;
  border: 0.2rem solid ${({ theme }) => theme.shadows[900]};
  border-radius: 1rem;
  border-color: ${({ disabled, theme }) => (disabled ? 'none' : theme.colors.sub_800)};
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.3rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.sub_800};
  border-radius: 0.4rem;

  &:nth-of-type(1) {
    margin: 0 0.3rem 0 0;
  }

  & button {
    padding-left: 1rem;
  }
`;
