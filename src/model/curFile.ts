import { useState } from 'react';
import { createModel } from 'hox';
import IFileNode from '../utils/fileNode';

export function useCurFile() {
  const [curFile, setCurFile] = useState<IFileNode | null>(null);

  return {
    curFile,
    setCurFile,
  };
}

export default createModel(useCurFile);