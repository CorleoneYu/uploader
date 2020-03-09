import { post, get } from './index';
import { apiUrls } from '../constant';

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

export function uploadApi(uploadId: number, chunkIndex: number) {
  return post(apiUrls.file.upload, {
    chunkIndex,
    uploadId,
  }, {
    'Content-Type': 'application/octet-stream	'
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
  })
}

export function deleteFileApi(fileName: string, path: string) {
  return post(apiUrls.file.delete, {
    fileName,
    path,
  })
}