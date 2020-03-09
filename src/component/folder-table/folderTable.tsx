import React from 'react';
import { Table, Button, Modal, message } from 'antd';
import useFileNodeModel from '../../model/fileNode';
import IFileNode from '../../utils/fileNode';
import Column from 'antd/lib/table/Column';

const FolderTable = () => {
  const fileNodeModel = useFileNodeModel();

  const handleDelete = (fileNode: IFileNode) => {
    Modal.warning({
      title: `是否删除该项: ${fileNode.fileName} ?`,
      content: '删除该文件后不可找回!',
      okText: '确认',
      okType: 'danger',
      onOk: async () => {
        try {
          await fileNodeModel.deleteFile(fileNode);
          message.success('删除成功');
        } catch (err) {
          console.error('err', err);
        }
      },
      cancelText: '取消',
    });
  };

  const handlePreview = (fileNode: IFileNode) => {
    fileNodeModel.previewFile(fileNode);
  };

  const renderAction = (fileNode: IFileNode) => {
    return (
      <div>
        <Button type="danger" size="small" onClick={() => handleDelete(fileNode)}>
          删除
        </Button>
        {fileNode.isFile && (
          <Button
            type="primary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => handlePreview(fileNode)}
          >
            预览
          </Button>
        )}
      </div>
    );
  };

  const dataSource = fileNodeModel.fileNode ? fileNodeModel.fileNode.children : [];
  return (
    <Table
      dataSource={dataSource}
      rowKey={(record: IFileNode) => `${record.fileId}-${record.fileName}`}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.fileName}</p>,
        rowExpandable: () => false,
      }}
    >
      <Column title="文件名" dataIndex="fileName" key="fileName" />
      <Column title="大小" dataIndex="size" key="size" />
      <Column title="创建日期" dataIndex="createDate" key="createDate" />
      <Column title="操作" key="action" render={renderAction} />
    </Table>
  );
};

export default FolderTable;
