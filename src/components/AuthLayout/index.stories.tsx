import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Form } from 'antd';

import Button from '../Button';
import Input from '../Input';

import AuthLayout, { Props } from '.';

export default {
  title: 'Components/AuthLayout',
  component: AuthLayout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        {Story()}
      </BrowserRouter>
    )
  ],
  args: {
    open: true,
    close: () => {},
  }
} as Meta<Props>

export const Default: StoryObj<Props> = {
  args: {
    title: 'Access your account',
    children: (
      <Form
        name='signup_form'
        onFinish={() => {}}
      >
        <Form.Item
          name='email'
          label='Email'
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input type='email' placeholder='email@example.com' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item label='' colon={false}>
          <Button
            full
            type='primary'
            htmlType='submit'
            loading={false}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    )
  }
};
