import theme from '@/styles/theme';
import PropTypes from 'prop-types';
import * as S from './styles';

function Divider({ type = 'horizontal', margin, color = theme.colors.black_800, height = '1rem', ...props }) {
  return <S.Line className={type} color={color} margin={margin} height={height} style={{ ...props.style }} />;
}

Divider.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  margin: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
};

export default Divider;
