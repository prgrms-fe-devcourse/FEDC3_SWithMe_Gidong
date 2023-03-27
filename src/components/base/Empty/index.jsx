import { Image, Text } from '@/components/base';
import PropTypes from 'prop-types';
import { StyledEmpty } from './styles';

function Empty({ src, imageWidth, imageHeight, mainText, subText, ...props }) {
  return (
    <StyledEmpty>
      <Image src={src} width={imageWidth} height={imageHeight} alt={subText} />
      <Text weight={700} paragraph size='xLarge'>
        {mainText}
      </Text>
      {subText && (
        <>
          <br />
          <Text paragraph size='large'>
            {subText}
          </Text>
        </>
      )}
    </StyledEmpty>
  );
}

Empty.propTypes = {
  src: PropTypes.string,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mainText: PropTypes.string,
  subText: PropTypes.string,
};

export default Empty;
