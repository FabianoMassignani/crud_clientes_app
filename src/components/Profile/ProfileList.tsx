import { connect, ConnectedProps } from 'react-redux';
import { useState, useEffect, } from 'react';
import { loadAllUsers, deleteUser } from '../../actions/Auth.thunks';
import { Button, Space, Table, Tag, Modal } from 'antd';
import { ProfileUpdate } from '../Profile/ProfileUpdate';
import type { TableProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface Props extends ConnectedProps<typeof connector> { }

const _ProfileList = (props: Props) => {
  const { users, loadAllUsers, deleteUser, accessToken, loading } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const { confirm } = Modal;

  const showConfirm = (user: IUser) => {
    confirm({
      title: 'Deseja deletar este usuário?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta ação não pode ser desfeita.',
      onOk() {
        deleteUser(user, accessToken);
      },
      onCancel() {
      },
      okText: 'Deletar',
      cancelText: 'Cancelar',
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onLoad = () => {
    loadAllUsers(accessToken);
  }

  const editarUser = (user: IUser) => {
    setUser(user);
    showModal();
  }

  useEffect(() => {
    if (!loading)
      loadAllUsers(accessToken);
  }, [loadAllUsers, accessToken, loading]);

  const dataSource = users.map((item: IUser) => {
    return {
      ...item,
      key: item._id,
      active: item.active
    };
  });

  const columns: TableProps['columns'] = [
    {
      title: 'Nome',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <Space size="middle">
          <Tag color={active ? 'green' : 'volcano'}  >
            {active ? 'Ativo' : 'Inativo'}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Papel',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <>
          {role.map((tag: any) => {
            let color = 'green';

            if (tag === 'ADMIN') {
              color = 'geekblue';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {

      key: 'action',
      width: 200,
      render: (_, user) => (
        <Space size="small"
          style={{
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            onClick={() => editarUser(user)}>
            Editar
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => showConfirm(user)}>
            Deletar
          </Button>
        </Space >
      ),
    },
  ];

  return (
    <div className="table-container">

      <div className='header'>
        <h2>Usuários</h2>
      </div>

      <div className='table-users'>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={loading}
          size='middle'
        />
      </div>

      <Modal
        title="Editar usuário"
        open={isModalOpen}
        footer={null}
        onCancel={handleClose}
      >
        <ProfileUpdate
          user={user}
          handleClose={handleClose}
          onLoad={onLoad}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  accessToken: state.auth.accessToken,
  users: state.auth.users,
  userCurrent: state.auth.user,
});

const mapDispatchToProps = {
  loadAllUsers,
  deleteUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ProfileList = connector(_ProfileList);

export { ProfileList };
