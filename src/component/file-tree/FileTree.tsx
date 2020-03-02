import React, { Component } from 'react';
import { Tree } from 'antd';
import IFileNode from '../../utils/file-node'

interface IProps {
  root: IFileNode;
}

export default class FileTree extends Component<IProps> {
  onSelect = (keys: any, event: any) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  renderNode(file: IFileNode) {
    return (
      <Tree.TreeNode
        title={file.fileName}
        key={`${file.fileId}-${file.fileName}`}
        isLeaf={file.isFile}
      >
        {file.children.map(child => this.renderNode(child))}
      </Tree.TreeNode>
    );
  }

  render = () => {
    const { root } = this.props;
    return (
      <Tree.DirectoryTree
        multiple
        defaultExpandAll
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {this.renderNode(root)}
      </Tree.DirectoryTree>
    );
  };
}
