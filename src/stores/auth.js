import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const tokenAtom = atom({
  key: 'token',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const useToken = () => useRecoilState(tokenAtom);
const useResetToken = () => useResetRecoilState(tokenAtom);

export { useToken, useResetToken };
