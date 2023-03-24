import { forwardRef } from 'react';

const View = forwardRef(({ as, style, ...props }, ref) => {
  const Element = as || 'button';
  return <Element ref={ref} style={{ ...style }} {...props} />;
});

View.displayName = 'View';

export default View;
