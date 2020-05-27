import React, { useCallback } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { updatePwd } from '../../api/user';

interface IFormProps {
  form: FormInstance;
}

const UpdatePwdForm: React.FC<IFormProps> = (props) => {
  return (
    <Form form={props.form} name="updatePwd">
      <Form.Item name="pwd" label="密码" rules={[{ required: true }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item name="pwdAgain" label="确认" rules={[{ required: true }]}>
        <Input.Password placeholder="请确保与密码一致" />
      </Form.Item>
    </Form>
  );
};

export default function useUpdatePwdModal() {
  const [form] = Form.useForm();

  const handleOk = useCallback(() => {
    return form
      .validateFields()
      .then((values) => {
        const { pwd, pwdAgain } = values;
        if (pwd !== pwdAgain) {
          message.error('请确认二次密码是否一致');
          return Promise.reject();
        }
        return updatePwd(pwd);
      })
      .catch((e) => {
        console.log('useUpdatePwdModal e', e);
        return Promise.reject();
      });
  }, [form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
  }, [form]);

  const showModal = () => {
    Modal.confirm({
      title: '修改密码',
      content: <UpdatePwdForm form={form} />,
      onOk: handleOk,
      onCancel: handleCancel,
    });
  };

  return {
    showUpdatePwdModal: showModal,
  };
}
