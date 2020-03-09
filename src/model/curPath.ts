import { useState } from 'react';
import { createModel } from 'hox';

export function useCurPath() {
  const [curPath, setCurPath] = useState<string>('/');

  return {
    curPath,
    setCurPath,
  };
}

export default createModel(useCurPath);