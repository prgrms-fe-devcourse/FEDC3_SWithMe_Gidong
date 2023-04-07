import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isAuthorizedState = atom({
  key: 'isAuthorized',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const useAuthState = () => useRecoilState(isAuthorizedState);

export const useResetAuthState = () => useResetRecoilState(isAuthorizedState);
