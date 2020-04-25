// export const apiPrefix = '/api';
// export const userPrefix = `${apiPrefix}/user`;

export const apiUrls = {
  user: {
    signUp: '/signUp',
    signIn: '/signIn',
  },

  file: {
    getFileTree: '/fileTree',
    prepare: '/prepare',
    upload: '/upload',
    finish: '/finish',
    createFolder: '/createFolder',
    delete: '/deleteFile', // 删除文件(夹)
    remove: '/removeFile', // 移动文件(夹)
    copy: '/copyFile',
    share: '/share',
    cleanAllFile: '/cleanAllFile',
  },
};

export enum HttpCode {
  success = 0,
  token_expired = 1001,
  token_err = 1004,
  token_server_err = 1005,
}
