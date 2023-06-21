import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isAuthorizedState = atom({
  key: 'isAuthorized',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
