import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

export default () => {
  // 表单提交回调
  const onFinish = (values) => {
    console.log('Success:', values);
    history.push('/');
  };

  // 表单提交失败回调
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.warn('登录失败');
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.formContainer}
        {...layout}
        name="login"
        initialValues={{ username: 'admin', password: 'password' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3 className={styles.formTitle}>大杂烩</h3>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item {...tailLayout} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
