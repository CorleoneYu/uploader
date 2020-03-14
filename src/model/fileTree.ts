import { useState, useCallback } from 'react';
import { createModel } from 'hox';
import { getFileTreeApi, deleteFileApi } from '../api/file';
import IFileNode, { formatFileNode } from '../utils/fileNode';
export function useFileTree() {
  const [fileTree, setFileTree] = useState<IFileNode | null>(null);

  const deleteFile = useCallback(async (fileNode: IFileNode) => {
    const data = await deleteFileApi(fileNode.fileName, fileNode.path);
    console.log('deleteFile', data);
  }, []);
  

  const previewFile = useCallback((fileNode: IFileNode) => {
    console.log('handlePreview', fileNode);
  }, []);

  const fetchFileTree = useCallback(async () => {
    const data = await getFileTreeApi();
    const root = formatFileNode(data.data);
    console.log('fetchFileTree', root);
    setFileTree(root);
    return root;
  }, []); 

  return {
    fileTree,
    fetchFileTree,
    deleteFile,
    previewFile,
  };
}

export default createModel(useFileTree);
