import { post } from './index';
import { apiUrls } from '../constant/index';
export function signUp(account: string, password: string, userName: string) {
  return post(apiUrls.user.signUp, {
    account,
    password,
    userName,
  });
}

export function signIn(account: string, password: string) {
  return post(apiUrls.user.signIn, {
    account,
    password,
  });
}
