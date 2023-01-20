import { Button } from '@/components/base';
import { COLOR } from '@/styles/color';

function MyPageButton(props) {
  const { content, onClick } = props;

  return (
    <Button
      onClick={onClick}
      style={{
        width: '10rem',
        height: 'fit-content',
        padding: '1rem',
        borderRadius: '0.6rem',
        fontSize: '1.8rem',
        color: COLOR.WHITE,
        backgroundColor: COLOR.MYPAGE_SUBMIT_BUTTON_BG,
        textAlign: 'center',
        cursor: 'pointer',
      }}>
      {content}
    </Button>
  );
}

export default MyPageButton;
