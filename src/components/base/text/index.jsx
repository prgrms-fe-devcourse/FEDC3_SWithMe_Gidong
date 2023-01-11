import './index.css';

function Text({ children, block, paragraph, size, weight, underline, delete: del, color, mark, code, ...props }) {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontStyle = {
    fontWeight: weight ? weight : undefined,
    fontSize: typeof size === 'number' ? `${size}rem` : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  if (del) {
    children = <del>{children}</del>;
  }
  if (mark) {
    children = <mark>{children}</mark>;
  }
  if (code) {
    children = <code>{children}</code>;
  }

  return (
    <Tag
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...fontStyle, ...props.style }}
      {...props}>
      {children}
    </Tag>
  );
}

export default Text;
