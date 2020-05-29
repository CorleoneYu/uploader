import React, { useCallback } from 'react';
import { Form, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { updatePwd } from '../../api/user';
import useModalWithForm, { IFormProps } from '../../hooks/useModalWithForm'

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
  const handleOk = useCallback((form: FormInstance) => {
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
  }, []);

  const handleCancel = useCallback((form: FormInstance) => {
    form.resetFields();
  }, []);

  const { showModal } = useModalWithForm({
    handleCancel,
    handleOk,
    title: '修改密码',
    FormComponent: UpdatePwdForm
  }) 

  return {
    showUpdatePwdModal: showModal,
  };
}
