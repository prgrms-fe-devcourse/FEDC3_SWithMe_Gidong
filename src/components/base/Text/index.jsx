const Text = ({
  children,
  block,
  paragraph,
  size,
  strong,
  weight,
  underline,
  delete: del,
  color,
  mark,
  code,
  lineHeight,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontStyle = {
    fontWeight: strong ? 'bold' : weight ? `${weight}` : undefined,
    fontSize: typeof size === 'number' ? `${size}rem` : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color,
    lineHeight,
  };

  if (mark) {
    children = <mark>{children}</mark>;
  }
  if (code) {
    children = <code>{children}</code>;
  }
  if (del) {
    children = <del>{children}</del>;
  }

  return (
    <Tag style={{ ...fontStyle, ...props.style }} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
