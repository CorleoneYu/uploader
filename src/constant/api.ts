// export const apiPrefix = '/api';
// export const userPrefix = `${apiPrefix}/user`;

export const apiUrls = {
  user: {
    signUp: '/signUp',
    signIn: '/signIn',
  }
};

export enum HttpCode {
  success = 0,
  token_expired = 1001,
  token_err = 1004,
  token_server_err = 1005,
}
