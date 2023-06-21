import PropTypes from 'prop-types';

const HEADING_STYLES = {
  1: {
    fontSize: '4rem',
    fontWeight: 800,
    lineHeight: '150%',
  },
  2: {
    fontSize: '3.6rem',
    fontWeight: 800,
    lineHeight: '145%',
  },
  3: {
    fontSize: '3.2rem',
    fontWeight: 700,
    lineHeight: '140%',
  },
  4: {
    fontSize: '2.8rem',
    fontWeight: 600,
    lineHeight: '110%',
  },
  5: {
    fontSize: '2.4rem',
    fontWeight: 600,
    lineHeight: '110%',
  },
  6: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: '100%',
  },
};

const Heading = ({ children, level = 1, color, ...props }) => {
  const Tag = `h${level}`;

  return (
    <Tag style={{ color, ...HEADING_STYLES[level], ...props.style }} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  color: PropTypes.string,
};

export default Heading;
