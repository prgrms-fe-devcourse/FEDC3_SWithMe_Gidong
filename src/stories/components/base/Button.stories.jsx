import { Button } from '@/components/base';

export default {
  title: 'Components/Button',
  component: Button,
};

export function Default() {
  return (
    <>
      <Button as='button' style={{ fontSize: '2.4rem', width: '15rem', height: '6rem' }} round={+true}>
        이전
      </Button>
      <Button
        as='button'
        bgcolor='#617CEB'
        color='#ffffff'
        style={{ fontSize: '2.4rem', width: '15rem', height: '6rem' }}
        round={+false}>
        다음
      </Button>
    </>
  );
}
