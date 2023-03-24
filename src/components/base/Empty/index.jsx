import { Text } from '@/components/base';
import { StyledEmpty } from './styles';

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
