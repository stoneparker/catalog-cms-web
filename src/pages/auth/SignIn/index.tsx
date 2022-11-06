import { Form } from 'antd';

import Input from '../../../components/Input';
import AuthLayout from '../../../components/AuthLayout';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

const SignIn: React.FC = () => {
  const [form] = Form.useForm();

  function onFinish() {
    form
      .validateFields()
      .then((values) => {
        // use update mutation
        alert('submited form');

        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate failed :', info);
      });
  }

  return (
    <AuthLayout title={'Access your account'}>
      <Form
        form={form}
        name='signup_form'
        onFinish={onFinish}
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
          <Button full type='primary' htmlType='submit'>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <p>Don't have an account yet?{' '}
        <Link to='/signup'>Sign up</Link>.
      </p>
    </AuthLayout>
  )
}

export default SignIn;
