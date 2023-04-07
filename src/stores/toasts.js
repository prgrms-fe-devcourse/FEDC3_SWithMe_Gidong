import { atom } from 'recoil';

export const toastsState = atom({
  key: 'toasts',
  default: [],
});
