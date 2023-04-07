import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const useUserState = () => useRecoilState(userAtom);

export const useResetUserState = () => useResetRecoilState(userAtom);
