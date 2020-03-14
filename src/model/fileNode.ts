import { useState } from 'react';
import { createModel } from 'hox';
import IFileNode from '../utils/fileNode';

export function useFileNode() {
  const [fileNode, setFileNode] = useState<IFileNode | null>(null);

  return {
    fileNode,
    setFileNode,
  };
}

export default createModel(useFileNode);