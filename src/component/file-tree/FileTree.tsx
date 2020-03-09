import React, { useEffect } from 'react';
import { Tree } from 'antd';
import useFileTreeModel from '../../model/fileTree';
import useFileNode from '../../model/fileNode';
import useCurPath from '../../model/curPath';
import IFileNode from '../../utils/fileNode';

const previewFile = (fileNode: IFileNode) => {
  if (useFileNode.data) {
    useFileNode.data.previewFile(fileNode);
  }
}

const setCurPath = (path: string) => {
  if (useCurPath.data) {
    useCurPath.data.setCurPath(path);
  }
}

const setFileNode = (fileNode: IFileNode) => {
  if (useFileNode.data) {
    useFileNode.data.setFileNode(fileNode);
  }
}

const { DirectoryTree } = Tree;

const FileTree = () => {
  const fileTreeModel = useFileTreeModel();

  const init = async () => {
    const root = await fileTreeModel.fetchFileTree();
    setCurPath(root.fileName);
    setFileNode(root);
  }

  useEffect(() => {
    init();
  }, []);

  const onSelect = (keys: any, event: any) => {
    const [ path ] = keys;
    const node = event.node as IFileNode;

    if (node.isFile) {
      previewFile(node);
      return;
    }

    setCurPath(path);
    setFileNode(node);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  if (!fileTreeModel.fileTree) {
    return (
      <div>loading</div>
    );
  }

  return (
    <DirectoryTree
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={[fileTreeModel.fileTree]}
      expandAction="doubleClick"
    />
  )
}

export default FileTree;
