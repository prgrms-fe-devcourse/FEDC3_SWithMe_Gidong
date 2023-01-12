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
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontStyle = {
    fontWeight: strong ? 'bold' : weight ? `${weight}` : undefined,
    fontSize: typeof size === 'number' ? `${size}rem` : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color,
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
    <Tag
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...props.style, ...fontStyle }}
      {...props}>
      {children}
    </Tag>
  );
};

export default Text;
