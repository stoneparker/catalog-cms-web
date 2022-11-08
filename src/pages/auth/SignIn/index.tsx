import { Form, Modal } from 'antd';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import Input from '../../../components/Input';
import AuthLayout from '../../../components/AuthLayout';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

import getErrorMessage from '../../../utils/getErrorMessage';

import { login } from '../../../reducers/auth/actions';

const SignIn: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [commit, isInFlight] = useMutation(graphql`
    mutation SignInMutation($data: LoginUser!) {
      loginUser(data: $data) {
        _id,
        token,
        email,
        name,
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
            login(response.loginUser);
            navigate('/');
            form.resetFields();
          },
          onError(error) {
            Modal.error({
              title: 'Ops...',
              content: getErrorMessage(error),
            });
          }
        })
      })
      .catch((info) => {
        console.log('Validate failed:', info);
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
          <Button
            full
            type='primary'
            htmlType='submit'
            loading={isInFlight}
          >
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
