import styled from '@emotion/styled';

const Line = styled.hr`
  border: none;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;

const Divider = ({
  type = 'horizontal', // horizontal, vertical
  size = 8,
  color,
  height,
  ...props
}) => {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}px` : `${size}px 0`,
    backgroundColor: color,
    height,
  };

  return <Line {...props} className={type} style={{ ...dividerStyle, ...props.style }} />;
};

export default Divider;
