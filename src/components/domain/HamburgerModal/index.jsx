import { postUserSignOut } from '@/api/userSign';

import useAuth from '@/hooks/useAuth';

import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

function HamburgerModal({ visible, onClose }) {
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const signOut = async () => {
    await postUserSignOut();
    onLogout();
    navigate('/');
    onClose();
  };

  return (
    <S.HamburgerModal visible={visible} onClose={onClose} isDimTransparent>
      <ul>
        <S.Item
          onClick={() => {
            navigate('/myPage');
            onClose();
          }}>
          내 정보
        </S.Item>
        <S.Item
          onClick={() => {
            navigate('/myGroup');
            onClose();
          }}>
          내 그룹
        </S.Item>
        <S.Item onClick={signOut}>로그아웃</S.Item>
      </ul>
    </S.HamburgerModal>
  );
}

export default memo(HamburgerModal);
