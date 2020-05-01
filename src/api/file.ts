import { post, get } from './index';
import { apiUrls } from '../constant/api';
import { CancelTokenSource } from 'axios';

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

export function uploadApi(
  uploadId: number,
  chunkIndex: number,
  data: any,
  onProgress: any,
  source: CancelTokenSource
) {
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
        cancelToken: source.token,
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
 * 预览文件
 * 返回文件预览链接
 */
export function previewFileApi(fileId: number) {
  return get(apiUrls.file.previewUrl, { fileId });
}

/**
 * debugger 清除所有文件（包含脏数据）
 */
export function cleanAllFile() {
  return get(apiUrls.file.cleanAllFile, {});
}
