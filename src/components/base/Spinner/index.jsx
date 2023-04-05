import { Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import PropTypes from 'prop-types';
import { StyledSpinnerWrapper } from './styles';

const Spinner = ({ size = 'xLarge', color = COLOR.SPINNER_COLOR, loading = true, ...props }) => {
  return loading ? (
    <StyledSpinnerWrapper>
      <Icon className='fas fa-spin' name='circle-notch' size={size} color={color} />
    </StyledSpinnerWrapper>
  ) : null;
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['xLarge', 'huge']),
  color: PropTypes.string,
  loading: PropTypes.bool,
};

export default Spinner;
