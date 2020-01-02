export const apiPrefix = '/api';
export const userPrefix = `${apiPrefix}/user`;

export const apiUrls = {
  user: {
    login: `${userPrefix}/login`,
    register: `${userPrefix}/register`,
  },
};

export enum HttpCode {
  success = '0',
  token_expired = '1001',
  token_not = '1002',
  token_err = '1003',
}
