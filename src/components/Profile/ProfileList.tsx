import { connect, ConnectedProps } from 'react-redux';
import { useState, useEffect } from 'react';
import { loadAllUsers } from '../../actions/Auth.thunks';
import { Button, Space, Table, Tag, Modal, } from 'antd';
import { ProfileUpdate } from '../Profile/ProfileUpdate';
import type { TableProps } from 'antd';


interface Props extends ConnectedProps<typeof connector> { }

const _ProfileList = (props: Props) => {
  const { users, loadAllUsers, accessToken } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onLoad = () => {
    loadAllUsers(accessToken);
  }

  useEffect(() => {
    onLoad();
  }, []);

  const dataSource = users.map((user: IUser) => {
    return {
      ...user,
      key: user._id,
      active: user.active
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
        <Space size="small">
          <Button type="primary" onClick={
            () => {
              setUser(user);
              showModal();
            }
          }>Editar</Button>
          <Button type="primary" danger onClick={() => { }}>Deletar</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
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
});

const mapDispatchToProps = {
  loadAllUsers
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ProfileList = connector(_ProfileList);

export { ProfileList };
