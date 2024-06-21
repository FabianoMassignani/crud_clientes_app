import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Space } from 'antd';
import { updateUser } from '../../actions/Auth.thunks';
interface Props extends ConnectedProps<typeof connector> {
  user: IUser
  handleClose: () => void
  onLoad: () => void
}

const _ProfileUpdate = (props: Props) => {
  const { user, accessToken, updateUser, handleClose, onLoad, loading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, form]);

  const onFinish = () => {
    const values = form.getFieldsValue();

    const callback = () => {
      form.resetFields();
      handleClose();
      onLoad();
    }

    updateUser(values, accessToken, callback);
  };

  return (
    <Form
      form={form}
      name="update_form"
      className="update-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="id"
        hidden
      >
      </Form.Item>

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


      <Form.Item>
        <Space size="middle" >
          <Button
            type="primary"
            htmlType="submit"
            className="update-form-button"
            onClick={onFinish}
            loading={loading}
          >
            Atualizar
          </Button>

          <Button
            type="default"
            htmlType="button"
            className="update-form-button"
            onClick={handleClose}
            loading={loading}
          >
            Cancelar
          </Button>
        </Space>
      </Form.Item>
    </Form >
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  accessToken: state.auth.accessToken,
  users: state.auth.users,
});

const mapDispatchToProps = {
  updateUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ProfileUpdate = connector(_ProfileUpdate);

export { ProfileUpdate };
