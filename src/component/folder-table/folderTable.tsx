import React, { useCallback } from 'react';
import { Table, Button, Modal, message } from 'antd';
import useCurNodeModel from '../../model/curNode';
import useFileMapModel, { IFileNodeMap } from '../../model/fileMap';
const { Column } = Table;

const FolderTable = () => {
  const { curNodeChildren, curNode } = useCurNodeModel();

  const handleDelete = useCallback(
    (fileNode: IFileNodeMap) => {
      Modal.confirm({
        title: `是否删除该项: ${fileNode.get('fileName')} ?`,
        content: '删除该文件后不可找回!',
        okText: '确认',
        okType: 'danger',
        onOk: async () => {
          try {
            await useFileMapModel.data!.deleteFile(fileNode, curNode!.get('key'));
            message.success('删除成功');
          } catch (err) {
            console.error('err', err);
          }
        },
        cancelText: '取消',
        onCancel: () => {},
      });
    },
    [curNode]
  );

  const handlePreview = useCallback((fileNode: IFileNodeMap) => {
    useFileMapModel.data!.previewNode(fileNode.get('key'));
  }, []);

  const renderAction = useCallback(
    (fileNode: IFileNodeMap) => {
      return (
        <div>
          <Button type="danger" size="small" onClick={() => handleDelete(fileNode)}>
            删除
          </Button>

          <Button
            type="primary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => handlePreview(fileNode)}
          >
            预览
          </Button>
        </div>
      );
    },
    [handlePreview, handleDelete]
  );

  if (!curNodeChildren) {
    return <div>loading</div>;
  }

  return (
    <Table
      dataSource={curNodeChildren}
      rowKey={(record: IFileNodeMap) => `${record.get('fileId')}-${record.get('fileName')}`}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.get('fileName')}</p>,
        rowExpandable: () => false,
      }}
    >
      <Column
        title="文件名"
        key="fileName"
        render={(fileNode: IFileNodeMap) => fileNode.get('fileName')}
      />
      <Column title="大小" key="size" render={(fileNode: IFileNodeMap) => fileNode.get('size')} />
      <Column
        title="创建日期"
        key="createDate"
        render={(fileNode: IFileNodeMap) => fileNode.get('createDate')}
      />
      <Column title="操作" key="action" render={renderAction} />
    </Table>
  );
};

export default FolderTable;
