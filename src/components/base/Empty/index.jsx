import styled from '@emotion/styled';
import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';

function Empty({ src, width, height, mainText, subText, ...props }) {
  const imgStyle = {
    width: width + 'rem',
    height: height + 'rem',
  };

  return (
    <StyledEmpty>
      <img src={src} alt={subText} style={imgStyle} />
      <Text strong paragraph size={2} lineHeight={2}>
        {mainText}
      </Text>
      <Text paragraph size={2}>
        {subText}
      </Text>
    </StyledEmpty>
  );
}

export default Empty;

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0;
  color: ${COLOR.DARK};
`;
