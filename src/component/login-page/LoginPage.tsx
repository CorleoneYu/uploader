import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import useUserInfoModel from '../../model/userInfo';

import { LoginPage } from './style';

interface IFormData {
  username: string;
  account: string;
  password: string;
}

const defaultFormData: IFormData = {
  username: '',
  account: '',
  password: '',
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { signUp, signIn } = useUserInfoModel();

  const onFinish = useCallback((values: any) => {
    const { account, username, password } = values;
    if (isLogin) {
      signIn(account, password);
    } else {
      signUp(account, password, username);
    }
  }, [signIn, signUp, isLogin]);

  const onFinishFailed = useCallback((error: any) => {
    console.log('error: ', error);
  }, []);

  const toggleLogin = useCallback(() => {
    setIsLogin((isLogin) => !isLogin);
  }, []);

  return (
    <LoginPage>
      <Form
        className="login-form"
        {...layout}
        name="basic"
        initialValues={defaultFormData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>{isLogin ? '登录' : '注册'}</h2>
        <Form.Item
          label="Account"
          name="account"
          rules={[{ required: true, message: 'Please input your account!' }]}
        >
          <Input placeholder="account" />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" className="login-form-button" htmlType="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button onClick={toggleLogin} type="link">
            {isLogin ? 'register now!' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
    </LoginPage>
  );
}
