import { Form, Modal } from 'antd';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import Input from '../../../components/Input';
import AuthLayout from '../../../components/AuthLayout';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

import { login } from '../../../reducers/auth/actions';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [commit, isInFlight] = useMutation(graphql`
    mutation SignUpMutation($data: CreateUser!) {
      createUser(data: $data) {
        _id,
      }
    }
  `);

  function onFinish() {
    form
      .validateFields()
      .then((values) => {
        commit({
          variables: {
            data: values,
          },
          onCompleted(response: any, errors) {
            login(response.createUser);
            navigate('/');
            form.resetFields();
          },
          onError(error) {
            console.log(error);
            Modal.error({
              title: 'Ops...',
              content: 'User already exists',
            });
          }
        })
      })
      .catch((info) => {
        console.log('Validate failed:', info);
      });
  }

  return (
    <AuthLayout title={'Create new account'}>
      <Form
        form={form}
        name='signup_form'
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          label='Name'
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input placeholder='Your name' />
        </Form.Item>

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
          <Button full type='primary' htmlType='submit' loading={isInFlight}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account?{' '}
        <Link to='/login'>Log in</Link>.
      </p>
    </AuthLayout>
  )
}

export default SignUp;
