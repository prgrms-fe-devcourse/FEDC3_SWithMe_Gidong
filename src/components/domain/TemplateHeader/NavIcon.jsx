import { Button, Icon } from '@/components/base';
import { COLOR } from '@/styles/color';

const NavIcon = (props) => {
  const { onClick, icon } = props;

  return (
    <Button
      style={{ width: '3.5rem', height: '3.5rem', marginRight: '1rem', padding: '0' }}
      bgcolor={COLOR.HEADER_TRANSPARENT_BG}
      onClick={onClick}>
      <Icon name={icon} />
    </Button>
  );
};

export default NavIcon;
