import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';

interface Props extends ConnectedProps<typeof connector> {
  user: {
    username: string;
    email: string;
    role: string[];
  };
  form: any
}

const _ProfileUpdate = (props: Props) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH.PROFILE);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, form]);

  return (
    <Form
      form={form}
      name="update_form"
      className="update-form"
      initialValues={{ remember: true }}
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
          placeholder="Nome"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Por favor, insira seu email!',
          },
          {
            type: 'email',
            message: 'Por favor, insira um email válido!',
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
          mode="multiple"
        >
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="USER">User</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  accessToken: state.auth.accessToken,
  users: state.auth.users,
});

const mapDispatchToProps = {
  // Add any dispatch actions here
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ProfileUpdate = connector(_ProfileUpdate);

export { ProfileUpdate };
