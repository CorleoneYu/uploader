import { post, get } from './index';
import { apiUrls } from '../constant/api';

export function getFileTreeApi() {
  return get(apiUrls.file.getFileTree, {});
}

export function prepareApi(fileName: string, fileSize: number, filePath: string) {
  return post(apiUrls.file.prepare, {
    fileName,
    fileSize,
    filePath,
  });
}

export function uploadApi(uploadId: number, chunkIndex: number, data: any, onProgress: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.readAsArrayBuffer(data);
  }).then((arrayBuffer: any) => {
    return post(
      `${apiUrls.file.upload}?uploadId=${uploadId}&chunkIndex=${chunkIndex + 1}`,
      arrayBuffer as any,
      {
        onUploadProgress: onProgress,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        transformRequest: (data: any, headers: any) => {
          return data;
        },
      }
    );
  });
}

export function finishApi(uploadId: number) {
  return post(apiUrls.file.finish, {
    uploadId,
  });
}

export function createFolderApi(folderName: string, path: string) {
  return post(apiUrls.file.createFolder, {
    folderName,
    path,
  });
}

export function deleteFileApi(fileName: string, path: string) {
  return post(apiUrls.file.delete, {
    fileName,
    path,
  });
}

/**
 * debugger 清除所有文件（包含脏数据）
 */
export function cleanAllFile() {
  return get(apiUrls.file.cleanAllFile, {});
}