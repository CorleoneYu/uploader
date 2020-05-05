export const apiPrefix = 'http://120.77.208.81:8080';

export const apiUrls = {
  user: {
    signUp: apiPrefix + '/signUp',
    signIn: apiPrefix + '/signIn',
  },

  file: {
    getFileTree: apiPrefix +'/fileTree',
    prepare: apiPrefix +'/prepare',
    upload: apiPrefix + '/upload',
    finish: apiPrefix +'/finish',
    createFolder: apiPrefix +'/createFolder',
    delete: apiPrefix + '/deleteFile', // 删除文件(夹)
    remove: apiPrefix + '/removeFile', // 移动文件(夹)
    copy: apiPrefix + '/copyFile',
    share: apiPrefix + '/share',
    cleanAllFile: apiPrefix + '/cleanAllFile',
    previewUrl: apiPrefix + '/preViewUrl',
    download: apiPrefix + '/download',
  },
};

export enum HttpCode {
  success = 0,
  token_expired = 1001,
  token_err = 1004,
  token_server_err = 1005,
}
