import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface LoginFormProps extends FormComponentProps {}

class LoginForm extends Component<LoginFormProps> {
  handleSubmit = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />
              }
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedLoginForm;
