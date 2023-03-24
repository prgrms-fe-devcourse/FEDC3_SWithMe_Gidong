import { COLOR } from '@/styles/color';
import { StyledSpinnerWrapper, Icon } from './styles';

const Spinner = ({ size = 24, color = COLOR.SPINNER_COLOR, loading = true, ...props }) => {
  const sizeStyle = {
    width: size,
    height: size,
  };

  return loading ? (
    <StyledSpinnerWrapper>
      <Icon>
        <svg viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' style={sizeStyle}>
          <g fill='none' fillRule='evenodd'>
            <g transform='translate(1 1)'>
              <path d='M36 18c0-9.94-8.06-18-18-18' stroke={color} strokeWidth='2'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 18 18'
                  to='360 18 18'
                  dur='0.9s'
                  repeatCount='indefinite'
                />
              </path>
              <circle fill={color} cx='36' cy='18' r='1'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 18 18'
                  to='360 18 18'
                  dur='0.9s'
                  repeatCount='indefinite'
                />
              </circle>
            </g>
          </g>
        </svg>
      </Icon>
    </StyledSpinnerWrapper>
  ) : null;
};

export default Spinner;
