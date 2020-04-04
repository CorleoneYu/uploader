import { createModel } from 'hox';
import useFileMapModel from './fileMap';
import useCurNodeKeyModel from './curNodeKey';

/**
 * 当前节点 即文件(夹)
 * 通过 curNodeKey 从 fileMap 中 找到
 */
export function useCurNode() {
  const { fileMap } = useFileMapModel();
  const { curNodeKey } = useCurNodeKeyModel();
  const curNode = fileMap.get(curNodeKey);
  const curNodeChildren = !curNode
    ? []
    : curNode.get('childrenKey').map((child) => fileMap.get(child)!);

  return {
    curNode,
    curNodeChildren,
  };
}

export default createModel(useCurNode);
