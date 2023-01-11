import styled from '@emotion/styled';

const UserNavButton = (props) => {
  const { variant } = props;

  return (
    <StyledUserNavButton>
      <img src={variant} />
    </StyledUserNavButton>
  );
};

export default UserNavButton;

const StyledUserNavButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
  padding: 0;
`;
