import { post } from './index';
import { apiUrls } from '../constant/index';
export function signUpApi(account: string, password: string, userName: string) {
  return post(apiUrls.user.signUp, {
    account,
    password,
    userName,
  });
}

export function signInApi(account: string, password: string) {
  return post(apiUrls.user.signIn, {
    account,
    password,
  });
}
