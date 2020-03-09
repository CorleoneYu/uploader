import { useState } from 'react';
import { createModel } from 'hox';
import { getFileTreeApi } from '../api/file';
import IFileNode, { formatFileNode } from '../utils/fileNode';

export function useFileTree() {
  const [fileTree, setFileTree] = useState<IFileNode | null>(null);

  const fetchFileTree = async () => {
    const data = await getFileTreeApi();
    const root = formatFileNode(data.data);
    console.log('fetchFileTree', root);
    setFileTree(root);
    return root;
  }

  return {
    fileTree,
    fetchFileTree,
  };
}

export default createModel(useFileTree);