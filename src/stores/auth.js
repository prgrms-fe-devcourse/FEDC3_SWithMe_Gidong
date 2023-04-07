import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authAtom = atom({
  key: 'auth',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const useAuthState = () => useRecoilState(authAtom);

export const useResetAuthState = () => useResetRecoilState(authAtom);
