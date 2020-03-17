import { useState, useCallback } from 'react';
import { createModel } from 'hox';
import useFileNode from './fileNode';
import useCurPath from './curPath';
import { getFileTreeApi, deleteFileApi, createFolderApi } from '../api/file';
import IFileNode, { formatFileNode } from '../utils/fileNode';
import { history } from '../utils';

export function useFileTree() {
  const [fileTree, setFileTree] = useState<IFileNode | null>(null);

  const deleteFile = useCallback(async (fileNode: IFileNode) => {
    const data = await deleteFileApi(fileNode.fileName, fileNode.path);
    console.log('deleteFile', data);
  }, []);
  
  const previewFolder = useCallback((path: string, fileNode: IFileNode) => {
    useCurPath.data!.setCurPath(path);
    useFileNode.data!.setFileNode(fileNode);
    history.replace('/main/home');
  }, []);

  const previewFile = useCallback((fileNode: IFileNode) => {
    history.replace('/main/preview')
  }, []);

  const fetchFileTree = useCallback(async () => {
    const data = await getFileTreeApi();
    const root = formatFileNode(data.data);

    setFileTree(root);
    useCurPath.data!.setCurPath(root.fileName);
    useFileNode.data!.setFileNode(root);

    return root;
  }, []); 

  const createFolder = useCallback(async (folderName: string, path: string) => {
    const data = await createFolderApi(folderName, path);
    console.log('data: ', data);
  }, []);

  return {
    fileTree,
    fetchFileTree,
    deleteFile,
    previewFile,
    previewFolder,
    createFolder,
  };
}

export default createModel(useFileTree);
