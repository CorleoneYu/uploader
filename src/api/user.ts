import { post, get } from './index';
import { apiUrls } from '../constant/api';
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

export function getUserInfo() {
  return get(apiUrls.user.userInfo, {});
}

export function updatePwd(password: string) {
  return post(apiUrls.user.updatePwd, {
    password
  })
}