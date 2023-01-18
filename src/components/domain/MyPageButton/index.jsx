import { Button } from '@/components/base';
import { COLOR } from '@/styles/color';

function MyPageButton(props) {
  const { content, onClick } = props;

  return (
    <Button
      onClick={onClick}
      style={{
        width: '12.0rem',
        height: '4rem',
        borderRadius: '0.5rem',
        fontSize: '1.8rem',
        color: COLOR.WHITE,
        backgroundColor: COLOR.MYPAGE_SUBMIT_BUTTON_BG,
      }}>
      {content}
    </Button>
  );
}

export default MyPageButton;
