import { signIn, signUp } from '../api/user';

type Token = string;

export class LoginService {
  public static TOKEN_KEY = 'token';

  getToken(): Token {
    return localStorage.getItem(LoginService.TOKEN_KEY) || '';
  }

  isExpired(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }

    return false;
  }

  setToken(token: string) {
    localStorage.setItem(LoginService.TOKEN_KEY, token);
  }

  // 注册
  signUp = async (account: string, password: string, userName: string) => {
    try {
      const data = await signUp(account, password, userName);
      const { token } = data.data;
      this.setToken(token);
      return Promise.resolve(token);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // 登录
  signIn = async (account: string, password: string) => {
    try {
      const data = await signIn(account, password);
      const { token } = data.data;
      this.setToken(token);
      return Promise.resolve(token);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const loginService = new LoginService();