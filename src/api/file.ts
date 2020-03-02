import { post, get } from './index';
import { apiUrls } from '../constant';

export function getFileTree() {
  return get(apiUrls.file.getFileTree, {});
}

export function prepare(fileName: string, fileSize: number, filePath: string) {
  return post(apiUrls.file.prepare, {
    fileName,
    fileSize,
    filePath,
  });
}

export function upload(uploadId: number, chunkIndex: number) {
  return post(apiUrls.file.upload, {
    chunkIndex,
    uploadId,
  }, {
    'Content-Type': 'application/octet-stream	'
  });
}

export function finish(uploadId: number) {
  return post(apiUrls.file.finish, {
    uploadId,
  });
}