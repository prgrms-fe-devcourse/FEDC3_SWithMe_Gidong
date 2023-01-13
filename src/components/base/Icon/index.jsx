function Icon({ type = 'solid', name = 'xmark', size, ...props }) {
  let classname = `fa-${type} fa-${name}`;
  if (size) {
    classname += ` fa-${size}x`;
  }
  return <i className={classname} style={{ ...props.style }} {...props}></i>;
}

export default Icon;
