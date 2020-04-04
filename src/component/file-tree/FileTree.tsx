import React, { useEffect, useCallback } from 'react';
import { defaultKey } from '../../constant';
import useFileMapModel, { IFileNodeMap } from '../../model/fileMap';

import { Tree } from 'antd';
const { TreeNode } = Tree;

const FileTree = () => {
  const { fileMap, fetchFileMap, previewNode } = useFileMapModel();
  const fileRoot = fileMap.get(defaultKey);

  useEffect(() => {
    fetchFileMap();
  }, [fetchFileMap]);

  const onSelect = useCallback(
    (keys: any, event: any) => {
      const node = event.node;
      previewNode(node.key);
    },
    [previewNode]
  );

  const onExpand = useCallback(() => {
    console.log('Trigger Expand');
  }, []);

  const renderTree = useCallback((fileNode: IFileNodeMap, fileMap) => {
    const curNodeChildren = fileNode.get('childrenKey').map((childKey) => fileMap.get(childKey)!);
    return (
      <TreeNode title={fileNode.get('fileName')} key={fileNode.get('key')}>
        {curNodeChildren && curNodeChildren.map((child) => renderTree(child, fileMap))};
      </TreeNode>
    );
  }, []);
  if (!fileRoot) {
    return <div>loading</div>;
  }

  return (
    <Tree onSelect={onSelect} onExpand={onExpand} defaultExpandAll>
      {renderTree(fileRoot, fileMap)}
    </Tree>
  );
};

export default FileTree;
