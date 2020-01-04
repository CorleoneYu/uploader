import { post } from './index';

export function signUp(account: string, password: string, userName: string) {
  return post('/signUp', {
    account,
    password,
    userName,
  });
}

export function signIn(account: string, password: string) {
  return post('/signIn', {
    account,
    password,
  });
}
