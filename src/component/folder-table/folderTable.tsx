import React, { Component } from 'react';
import { Table } from 'antd';

import IFileNode from '../../utils/file-node';

interface IProps {
  folder: IFileNode;
}

const columns = [
  {
    title: '文件名',
    dataIndex: 'fileName',
  },
  {
    title: '大小',
    dataIndex: 'size',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  },
];

export default class FileTree extends Component<IProps> {
  render = () => {
    const { folder } = this.props;
    return (
      <Table
        rowKey={(record) => `${record.fileId}-${record.fileName}`}
        dataSource={folder.children}
        columns={columns}
      />
    );
  };
}
