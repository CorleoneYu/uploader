import React, { Component } from "react";

import { Tree } from "antd";

import { FileUpload, Directory } from "../../core";
import { mockTree } from "../../core/test";

type Info = FileUpload | Directory;
interface IState {
  infoList: Info[];
}

export default class FileTree extends Component<{}, IState> {
  state = {
    infoList: []
  };

  componentDidMount() {
    this.getInfoList();
  }

  getInfoList() {
    this.setState({
      infoList: [mockTree()]
    });
  }

  onSelect = (keys: any, event: any) => {
    console.log("Trigger Select", keys, event);
  };

  onExpand = () => {
    console.log("Trigger Expand");
  };

  renderFile(file: FileUpload) {
    return <Tree.TreeNode title={file.name} key={file.fileId} isLeaf />;
  }

  renderDir = (dir: Directory) => {
    return (
      <Tree.TreeNode title={dir.name} key={dir.dirId}>
        {dir.subDirs.map(subDir => this.renderDir(subDir))}
        {dir.subFiles.map(subFile => this.renderFile(subFile))}
      </Tree.TreeNode>
    );
  };

  render = () => {
    const { infoList } = this.state;
    return (
      <Tree.DirectoryTree
        multiple
        defaultExpandAll
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {infoList.map((info: Info) => {
          if (info instanceof FileUpload) {
            // return <FileNode file={info} key={`file-node-${info.fileId}`} />;
            return this.renderFile(info);
          } else if (info instanceof Directory) {
            // return <DirNode dir={info} key={`dir-node-${info.dirId}`} />;
            return this.renderDir(info);
          }
        })}
      </Tree.DirectoryTree>
    );
  };
}
