import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function Introduction({ intro, containerProps, textProps, ...props }) {
  return (
    <StyledIntroductionContainer {...containerProps}>
      {intro ? (
        <StyledTextWrapper style={{ ...props.style }} {...props}>
          <Text size={1.4} {...textProps}>
            {intro}
          </Text>
        </StyledTextWrapper>
      ) : null}
    </StyledIntroductionContainer>
  );
}

export default Introduction;

const StyledIntroductionContainer = styled.div`
  width: 100%;
`;

const StyledTextWrapper = styled.div`
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
`;
