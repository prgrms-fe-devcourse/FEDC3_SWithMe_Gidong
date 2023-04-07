import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const useUserState = () => useRecoilState(userState);

export const useResetUserState = () => useResetRecoilState(userState);
