import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { LoginPage } from './style';
import { signIn, signUp } from '../../api/user';
interface ISignIn {
  account: string;
  password: string;
}

interface ISignUp extends ISignIn {
  username: string;
}

interface ILoginFormProps extends FormComponentProps {}
interface ILoginFormState {
  isLogin: boolean;
  username: string;
  password: string;
  account: string;
}
class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  state = {
    isLogin: true,
    username: '',
    password: '',
    account: '',
  };

  toggleLogin = () => {
    const { isLogin } = this.state;
    this.setState({
      isLogin: !isLogin,
    });
  };

  handleSignIn = ({ account, password }: ISignIn) => {
    signIn(account, password);
  };

  handleSignUp = ({ account, password, username }: ISignUp) => {
    signUp(account, password, username);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isLogin } = this.state;
    this.props.form.validateFields((err, values) => {
      console.log('validateFields', err, values);

      if (isLogin) {
        this.handleSignIn(values as ISignIn);
        return;
      }

      this.handleSignUp(values as ISignUp);
      return;
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    return (
      <LoginPage>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <h2>{isLogin ? '登录' : '注册'}</h2>
          <Form.Item>
            {getFieldDecorator('account', {
              rules: [
                { required: true, message: 'Please input your account!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />
                }
                placeholder="account"
              />
            )}
          </Form.Item>
          {!isLogin && (
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
          )}
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            htmlType="submit"
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button onClick={this.toggleLogin} type="link">
            {isLogin ? 'register now!' : 'Login'}
          </Button>
        </Form>
      </LoginPage>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedLoginForm;
