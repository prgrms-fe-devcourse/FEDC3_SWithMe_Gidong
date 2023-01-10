import PropTypes from 'prop-types';

const Header = ({ children, level = 1, size, strong, underline, color, ...props }) => {
  let Tag = `h${level}`;

  if (level < 1 || level > 6) {
    console.warn('Header only accept `1 | 2 | 3 | 4 | 5 | 6` as `level` value.');
    Tag = 'h1';
  }

  const fontStyle = {
    fontSize: size ? size : undefined,
    fontWeight: strong ? 'bold' : 'normal',
    textDecoration: underline ? 'underline' : undefined,
    color,
  };
  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  size: PropTypes.number,
  strong: PropTypes.bool,
  underline: PropTypes.bool,
};

export default Header;
