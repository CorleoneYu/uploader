import React, { useCallback } from 'react';
import useModalWithForm, { IFormProps } from '../../hooks/useModalWithForm'
import useCurNodeModel from '../../model/curNode';
import useFileMapModel from '../../model/fileMap';

/* antd */
import { Form, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';

const CreateFolder: React.FC<IFormProps> = ({ form }) => {
  return (
    <Form form={form} name="folderForm" layout="vertical">
      <Form.Item name="name" label="文件夹名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
}

export default function useCreateFolderModal() {
  const { curNode } = useCurNodeModel();
  const { createFolder } = useFileMapModel();

  const handleOk = useCallback((form: FormInstance) => {
    return form
    .validateFields()
    .then((values) => {
      const curPath = curNode ? curNode.get('key') : '';
      return createFolder(values.name, curPath);
    })
    .then((data) => {
      message.success('创建文件夹成功');
      return Promise.resolve();
    })
    .catch((info) => {
      console.log('info: ', info);
      return Promise.reject();
    });
  }, [curNode, createFolder]);

  const { showModal } = useModalWithForm({
    handleOk,
    title: '创建文件夹',
    FormComponent: CreateFolder,
  });

  return {
    showModal
  }
}
