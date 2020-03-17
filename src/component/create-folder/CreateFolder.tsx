import React, { useRef, useEffect } from 'react';
import useCurPath from '../../model/curPath';
import useFileTree from '../../model/fileTree';

/* antd */
import { Modal, Form, Input, message } from 'antd';

const createFolder = useFileTree.data!.createFolder;

interface ICreateFolderProps {
  visible: boolean;
  hideModal: () => void;
}

const CreateFolder: React.FC<ICreateFolderProps> = ({ visible, hideModal }) => {
  const [form] = Form.useForm();
  const curPath = useCurPath.data!.curPath;
  const prevVisibleRef = useRef(visible);
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    console.log(visible, prevVisible);
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible, form, prevVisible]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        return createFolder(values.name, curPath);
      })
      .then((data) => {
        message.success('创建文件夹成功');
        hideModal();
      })
      .catch((info) => {
        console.log('info: ', info);
      });
  };

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
