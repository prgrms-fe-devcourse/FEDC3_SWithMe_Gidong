import { Textarea } from '@/components/base';

export default {
  title: 'Components/Textarea',
  component: Textarea,
};

export function Default() {
  return <Textarea value='' label='label' />;
}

export function CraeteGroupModalTextarea() {
  return (
    <Textarea
      value=''
      placeholder='그룹을 소개하는 글을 작성해주세요.'
      max={300}
      wrapperProps={{ style: { width: '32rem' } }}
      style={{ fontSize: '1.2rem', height: '16rem' }}
    />
  );
}
