import { atom } from 'recoil';
import { getAllUsers } from '@/api/user';

export const usersState = atom({
  key: 'users',
  default: (async () => {
    const users = await getAllUsers();

    return users;
  })(),
});
