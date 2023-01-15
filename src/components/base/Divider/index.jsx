import styled from '@emotion/styled';

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

const Line = styled.hr`
  border: none;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 0.1rem;
    height: 1.3rem;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1.3rem;
  }
`;
