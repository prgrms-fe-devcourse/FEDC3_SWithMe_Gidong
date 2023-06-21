import { Icon } from '@/components/base';
import theme from '@/styles/theme';
import PropTypes from 'prop-types';
import * as S from './styles';

const Spinner = ({ size = 'xLarge', color = theme.colors.whiteGray_600, loading = true }) => {
  return loading ? (
    <S.SpinnerWrapper>
      <Icon className='fas fa-spin' name='circle-notch' size={size} color={color} />
    </S.SpinnerWrapper>
  ) : null;
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['xLarge', 'huge']),
  color: PropTypes.string,
  loading: PropTypes.bool,
};

export default Spinner;
