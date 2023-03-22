import { Line } from './styles';

const Divider = ({
  type = 'horizontal', // horizontal, vertical
  size = 0.8,
  color,
  height,
  ...props
}) => {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}rem` : `${size}rem 0`,
    backgroundColor: color,
    height: `${height}rem`,
  };

  return <Line {...props} className={type} style={{ ...dividerStyle, ...props.style }} />;
};

export default Divider;
