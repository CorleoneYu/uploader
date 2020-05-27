import React, { useRef, useEffect, useCallback } from 'react';
import useCurNodeModel from '../../model/curNode';
import useFileMapModel from '../../model/fileMap';

/* antd */
import { Modal, Form, Input, message } from 'antd';

/**
 * TODO: 改造成 useUpdatePwdModal 的实现方式
 * 并且还可以进一步抽象
 */
interface ICreateFolderProps {
  visible: boolean;
  hideModal: () => void;
}

const CreateFolder: React.FC<ICreateFolderProps> = ({ visible, hideModal }) => {
  const { curNode } = useCurNodeModel();
  const { createFolder } = useFileMapModel();
  const [form] = Form.useForm();

  const prevVisibleRef = useRef(visible);
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible, form, prevVisible]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const curPath = curNode ? curNode.get('key') : '';
        return createFolder(values.name, curPath);
      })
      .then((data) => {
        message.success('创建文件夹成功');
        hideModal();
      })
      .catch((info) => {
        console.log('info: ', info);
      });
  }, [form, curNode, createFolder, hideModal]);

  return (
    <Modal title="新建文件夹" visible={visible} onOk={onOk} onCancel={hideModal}>
      <Form form={form} name="folderForm" layout="vertical">
        <Form.Item name="name" label="文件夹名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFolder;
