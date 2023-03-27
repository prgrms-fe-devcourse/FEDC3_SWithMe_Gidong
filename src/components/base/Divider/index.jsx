import { COLOR } from '@/styles/color';
import PropTypes from 'prop-types';
import { Line } from './styles';

function Divider({ type = 'horizontal', margin, color = COLOR.GRAY, height = '1rem', ...props }) {
  return <Line className={type} color={color} margin={margin} height={height} style={{ ...props.style }} />;
}

Divider.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  margin: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
};

export default Divider;
