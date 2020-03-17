import React, { useEffect } from 'react';
import { Tree } from 'antd';
import useFileTreeModel from '../../model/fileTree';

import IFileNode from '../../utils/fileNode';

const { DirectoryTree } = Tree;

const FileTree = () => {
  const { fileTree, fetchFileTree, previewFile, previewFolder } = useFileTreeModel();

  useEffect(() => {
    fetchFileTree();
  }, [fetchFileTree]);

  const onSelect = (keys: any, event: any) => {
    const [ path ] = keys;
    const node = event.node as IFileNode;

    if (node.isFile) {
      previewFile(node);
      return;
    }

    previewFolder(path, node);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  if (!fileTree) {
    return (
      <div>loading</div>
    );
  }

  return (
    <DirectoryTree
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={[fileTree]}
      expandAction="doubleClick"
    />
  )
}

export default FileTree;
