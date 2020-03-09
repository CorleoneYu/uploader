import { useState } from 'react';
import { createModel } from 'hox';
import { deleteFileApi } from '../api/file';
import IFileNode from '../utils/fileNode';

export function useFileNode() {
  const [fileNode, setFileNode] = useState<IFileNode | null>(null);

  const deleteFile = async (fileNode: IFileNode) => {
    const data = await deleteFileApi(fileNode.fileName, fileNode.path);
    console.log('deleteFile', data);
  }

  const previewFile = (fileNode: IFileNode) => {
    console.log('handlePreview', fileNode);
  }

  return {
    fileNode,
    setFileNode,
    deleteFile,
    previewFile,
  };
}

export default createModel(useFileNode);