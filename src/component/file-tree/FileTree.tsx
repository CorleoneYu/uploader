import React, { Component } from 'react';

import { Tree } from 'antd';

import FileNode, { mockFileTree } from '../../model/file-node';

interface IState {
  fileList: FileNode[];
}

export default class FileTree extends Component<{}, IState> {
  state = {
    fileList: [],
  };

  componentDidMount() {
    this.getFileList();
  }

  getFileList() {
    this.setState({
      fileList: [mockFileTree()],
    });
  }

  onSelect = (keys: any, event: any) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  renderNode(file: FileNode) {
    return (
      <Tree.TreeNode
        title={file.fileName}
        key={`${file.fileId}`}
        isLeaf={file.isFile}
      >
        {file.children.map(child => this.renderNode(child))}
      </Tree.TreeNode>
    );
  }

  render = () => {
    const { fileList } = this.state;
    return (
      <Tree.DirectoryTree
        multiple
        defaultExpandAll
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {fileList.map((node: FileNode) => this.renderNode(node))}
      </Tree.DirectoryTree>
    );
  };
}
