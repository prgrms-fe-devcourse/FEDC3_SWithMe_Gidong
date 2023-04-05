import { Text } from '@/components/base';
import { StyledIntroductionContainer, StyledTextWrapper } from './styles';

function Introduction({ intro, containerProps, textProps, ...props }) {
  return (
    <StyledIntroductionContainer {...containerProps}>
      {intro ? (
        <StyledTextWrapper style={{ ...props.style }} {...props}>
          <Text {...textProps}>{intro}</Text>
        </StyledTextWrapper>
      ) : null}
    </StyledIntroductionContainer>
  );
}

export default Introduction;
