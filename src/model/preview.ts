import { useState, useCallback } from 'react';
import { createModel } from 'hox';
import useCurNodeModel from './curNode';
import { previewFileApi } from '../api/file';

export enum FILE_TYPE {
  // 文件类型
  'IMG' = 'img',
  'VIDEO' = 'video',
  'UNKNOWN' = 'unknown',
}

interface IFileTypeMap {
  [key: string]: FILE_TYPE,
}

export const fileTypeMap: IFileTypeMap = {
  'png': FILE_TYPE.IMG,
  'jpeg': FILE_TYPE.IMG,
  'jpg': FILE_TYPE.IMG,
}

export interface IPreviewFile {
  previewUrl: string;
  fileType: FILE_TYPE;
  name: string;
}

/**
 * 文件预览链接
 */
export function usePreviewFile() {
  const [previewFile, setPreview] = useState<IPreviewFile | null>(null);
  const { curNode } = useCurNodeModel();

  const getFileType = useCallback((curNode: any) => {
    let type: string = curNode.get('type') || '';
    type = type.toLocaleLowerCase();
    return fileTypeMap[type] || FILE_TYPE.UNKNOWN;
  }, []);

  // 获取文件预览链接
  const fetchPreviewFile = useCallback(async () => {
    if (!curNode || !curNode.get('isFile') ) {
      return;
    }

    let fileType = getFileType(curNode);

    const res = await previewFileApi(curNode.get('fileId'));
    setPreview({
      fileType,
      previewUrl: res.data,
      name: curNode.get('fileName'),
    });
  }, [curNode, getFileType]);

  return {
    previewFile,
    setPreview,
    fetchPreviewFile,
    curNode,
  };
}

export default createModel(usePreviewFile);
