import styled from '@emotion/styled';

const UserSignInButton = (props) => {
  const { variant } = props;

  return <StyledUserSignInButton>{variant}</StyledUserSignInButton>;
};

export default UserSignInButton;

const StyledUserSignInButton = styled.button`
  width: 7.7rem;
  height: 2.1rem;
  font-size: 1.8rem;
  margin: 0.7rem 0;
`;
