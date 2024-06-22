import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Switch, Tag } from 'antd';
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
        ...user,
        id: user._id,
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
        name="phone"
        rules={[{
          message: "Por favor, insira um número de telefone válido!",
          pattern: new RegExp(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)
        }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phone"
        />
      </Form.Item>

      <div className='update-form-cpf-cnpj'
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px'
        }}>
        <Form.Item
          name="cpf"
          rules={
            [{
              message: "Por favor, insira um CPF válido!",
              pattern: new RegExp(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/)
            }]
          }
        >
          <Input
            placeholder="CPF"
          />
        </Form.Item>

        <Form.Item
          name="cnpj"
          rules={
            [{
              message: "Por favor, insira um CNPJ válido!",
              pattern: new RegExp(/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/)
            }]
          }
        >
          <Input

            placeholder="CNPJ"
          />
        </Form.Item>

      </div>
      <Form.Item
        name="endereco"
      >
        <Input
          placeholder="Endereço"
        />
      </Form.Item>

      <div className='update-form-cep-cidade-estado'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <Form.Item
          name="cep"
          rules={
            [{
              message: "Por favor, insira um CEP válido!",
              pattern: new RegExp(/^\d{5}-\d{3}$/)
            }]
          }
        >
          <Input
            placeholder="CEP"
          />
        </Form.Item>

        <Form.Item
          name="cidade"
          rules={
            [{
              type: 'string',
              message: "Por favor, insira uma cidade válida!",
            }]
          }

        >
          <Input
            placeholder="Cidade"
          />
        </Form.Item>

        <Form.Item
          name="estado"
          rules={
            [{
              type: 'string',
              message: "Por favor, insira um estado válido!",
            }]
          }
        >
          <Input
            placeholder="Estado"
          />
        </Form.Item>

      </div>
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
          tagRender={(props) => {
            const { label, value } = props;

            let color = 'green';

            if (value === 'ADMIN') {
              color = 'geekblue';
            }

            return (
              <Tag color={color}  >
                {label}
              </Tag>
            );
          }
          }
        >
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="USER">User</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="active"
      >
        Ativo:
        <Switch
          defaultChecked={user.active}
        />;
      </Form.Item>

      <Form.Item>
        <div className='update-form-actions'>
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
        </div>
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
