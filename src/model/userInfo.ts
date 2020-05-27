import { useState, useCallback } from 'react';
import { createModel } from 'hox';
import { signInApi, signUpApi, getUserInfo } from '../api/user';
import { history } from '../utils/history';

interface IUserInfo {
  account: string;
  userName: string;
  usedCapacity: number;
  storageCapacity: number;
  token: string;
}

const defaultUserInfo: IUserInfo = {
  account: '',
  userName: '默认',
  usedCapacity: 0,
  storageCapacity: 0,
  token: '',
};

const TOKEN_KEY = 'token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function isExpired(): boolean {
  const token = getToken();
  if (token) {
    return true;
  }

  return false;
}

export function layout() {
  const TOKEN_EMPTY = '';
  setToken(TOKEN_EMPTY);
  history.replace('/login');
}

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);

  // 注册
  const signUp = useCallback(async (account: string, password: string, userName: string) => {
    try {
      const data = await signUpApi(account, password, userName);
      console.log('signUp: ', data);
    } catch (err) {
      console.log('signUp: ', err);
      return err;
    }
  }, []);

  // 登录
  const signIn = useCallback(async (account: string, password: string) => {
    try {
      const data = await signInApi(account, password);
      const { token, userName } = data.data;
      setToken(token);
      setUserInfo((userInfo) => {
        return {
          ...userInfo,
          account,
          token,
          userName,
        };
      });
      history.replace('/main');
    } catch (err) {
      return err;
    }
  }, []);

  // 获取 更新用户信息
  const updateUserInfo = useCallback(async () => {
    const data = await getUserInfo();
    const { account, userName, storageCapacity, usedCapacity } = data.data;
    setUserInfo((userInfo) => {
      return {
        ...userInfo,
        account,
        userName,
        storageCapacity,
        usedCapacity,
      };
    });
  }, []);

  return {
    userInfo,
    setUserInfo,
    signUp,
    signIn,
    updateUserInfo
  };
}

export default createModel(useUserInfo);
