import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/Auth.thunks';
import { PATH } from '../../constants/paths';

interface Props extends ConnectedProps<typeof connector> { }

const _Register = (props: Props) => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = props;


  const onFinish = (values: ReqRegister) => {
    const callback = () => navigate(PATH.LOGIN);

    register(values, callback);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (isAuthenticated) {
    navigate(PATH.PROFILE);
  }

  return (
    <div className="container">
      <div className="login-form">
        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu nome!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor, insira sua senha!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Por favor, confirme sua senha!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione seu papel!',
              },
            ]}
          >
            <Select
              placeholder="Selecione seu papel"
              allowClear
              mode='multiple'
            >
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Cadastrar
            </Button>
          </Form.Item>

          <div className="login-form-register-link">
            <Link to={PATH.LOGIN}>Entrar</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  register,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const Register = connector(_Register);

export { Register };
