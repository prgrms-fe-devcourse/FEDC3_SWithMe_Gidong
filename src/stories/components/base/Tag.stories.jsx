import { Tag } from '@/components/base';
import { useRef } from 'react';

export default {
  title: 'Components/Tag',
  component: Tag,
};

export function Default() {
  const ref = useRef([]);
  return <Tag ref={ref} />;
}
