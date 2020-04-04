import { useState } from 'react';
import { createModel } from 'hox';

/**
 * 当前节点(文件夹或文件)的 key
 * 主要是用来从 fileMap 中 找到 正在预览的 文件(夹)
 */
export function useCurNodeKey() {
  const [curNodeKey, setCurNodeKey] = useState<string>('');

  return {
    curNodeKey,
    setCurNodeKey,
  };
}

export default createModel(useCurNodeKey);
