import { Button } from '@/components/base';
import { COLOR } from '@/styles/color';

function HeaderDropdownButton(props) {
  const { content, onClick } = props;

  return (
    <li>
      <Button
        style={{
          width: '8rem',
          height: '3.7rem',
          padding: '0',
          borderBottom: '0.05rem solid #E8E7EB',
          fontSize: '1.8rem',
          color: COLOR.DARK,
        }}
        bgcolor={'white'}
        onClick={onClick}>
        {content}
      </Button>
    </li>
  );
}

export default HeaderDropdownButton;
