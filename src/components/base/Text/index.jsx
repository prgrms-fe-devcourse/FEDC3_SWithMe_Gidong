import PropTypes from 'prop-types';
import { COLOR } from '@/styles/color';

const SizeToCssValue = {
  default: '1.4rem',
  xSmall: '0.9rem',
  small: '1.2rem',
  medium: '1.6rem',
  large: '1.8rem',
  xLarge: '2rem',
  xxLarge: '2.4rem',
  huge: '3rem',
};

function Text({
  children,
  block = false,
  paragraph = false,
  size = 'default',
  weight = 400,
  underline = false,
  color = COLOR.BLACK,
  inherit = false,
  ...props
}) {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontStyle = {
    fontWeight: inherit ? 'inherit' : weight,
    fontSize: inherit ? 'inherit' : SizeToCssValue[size],
    textDecoration: underline ? 'underline' : undefined,
    textUnderlinePosition: underline ? 'under' : undefined,
    color,
  };

  return (
    <Tag style={{ ...fontStyle, ...props.style }} {...props}>
      {children}
    </Tag>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
  weight: PropTypes.oneOf([300, 400, 500, 600, 700, 800]),
  underline: PropTypes.bool,
  color: PropTypes.string,
  inherit: PropTypes.bool,
};

export default Text;
