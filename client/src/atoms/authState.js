import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    username: '',
    email: '',
    id: '',
  }
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false, // false when no user is logged in
});
