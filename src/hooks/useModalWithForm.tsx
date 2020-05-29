import React, { useCallback } from 'react';
import { Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

export interface IFormProps {
  form: FormInstance;
}

export interface IModalProps {
  handleOk?: (form: FormInstance) => Promise<any>;
  handleCancel?: (form: FormInstance) => void;
  FormComponent: React.FC<IFormProps>;
  title: string;
}

/**
 * 封装了 modal 与 form 结合的 hooks
 * 外界使用时
 * 1. 定义 form 组件等参数后传入
 * 2. 得到 showModal 后通过函数调用
 * @param props 
 */
export default function useModalWithForm(props: IModalProps) {
  const { handleOk, handleCancel, FormComponent, title } = props;
  const [form] = Form.useForm();

  const onOk = useCallback(() => {
    if (!handleOk) {
      return Promise.resolve();
    }

    return handleOk(form)
  }, [handleOk, form]);

  const onCancel = useCallback(() => {
    handleCancel && handleCancel(form);
  }, [handleCancel, form]);

  const showModal = useCallback(() => {
    Modal.confirm({
      title,
      onCancel,
      onOk,
      content: <FormComponent form={form} />,
    });
  }, [form, onOk, onCancel, title]);

  return {
    showModal,
  };
}
