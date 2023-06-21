import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.WHITE};

  & > h3 {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${COLOR.GRAY_10};
  }

  & > div {
    width: 45rem;
  }
`;

const StyledGroupInfo = styled.div`
  width: 100%;
  padding: 2rem 0;

  & input {
    height: 3rem;
    font-weight: 100;
    font-size: 1.6rem;
    color: ${COLOR.DARK};
  }

  & textarea {
    height: 20rem;
    border-radius: 0.5rem;
    font-weight: 100;
    font-size: 1.6rem;
  }
`;

const StyledGroupButton = styled.button`
  width: 10rem;
  padding: 1rem;
  border-radius: 0.6rem;

  background-color: ${COLOR.PRIMARY_BTN};
  text-align: center;
  font-size: 1.8rem;
  color: ${COLOR.WHITE};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledGroupDelete = styled(StyledGroupBox)`
  background-color: ${COLOR.MY_GROUP_BOX_BG};

  & > h3 {
    border-bottom: 1px solid ${COLOR.RED_20};
    color: ${COLOR.RED_20};
  }

  & > p {
    padding: 1rem 0;
  }
`;

const StyledManageMember = styled(StyledGroupBox)`
  & > div {
    overflow-y: auto;
  }
`;

export { StyledGroupBox, StyledGroupInfo, StyledGroupButton, StyledGroupDelete, StyledManageMember };
