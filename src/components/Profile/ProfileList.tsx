import { connect, ConnectedProps } from 'react-redux';
import { useState, useEffect, } from 'react';
import { loadAllUsers, deleteUser } from '../../actions/Auth.thunks';
import { Button, Space, Table, Tag, Modal, Input } from 'antd';
import { ProfileUpdate } from '../Profile/ProfileUpdate';
import type { TableProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface Props extends ConnectedProps<typeof connector> { }

const _ProfileList = (props: Props) => {
  const { users, usersLength, loadAllUsers, deleteUser, accessToken, loading, userCurrent } = props;
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

  const onLoad = (
    search: string,
    limit: number,
    page: number
  ) => {
    loadAllUsers(accessToken, search, limit, page);
  }

  const onLoadDefault = () => {
    onLoad('', 10, 0);
  }

  const onLoadTimered = (search: string) => {
    let timer

    clearTimeout(timer);

    timer = setTimeout(() => {
      onLoad(search, 10, 0);
    }, 500);

  }

  const editarUser = (user: IUser) => {
    setUser(user);
    showModal();
  }

  useEffect(() => {
    if (!loading)
      onLoad('', 10, 0);
  }, [accessToken, loading]);

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
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
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
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = 'blue';

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
            disabled={!userCurrent.role.includes('ADMIN')}
            onClick={() => editarUser(user)}>
            Editar
          </Button>

          <Button
            type="primary"
            danger
            disabled={!userCurrent.role.includes('ADMIN') || userCurrent._id === user._id}
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
          title={
            () => (
              <Input.Search
                placeholder="Pesquisar"
                allowClear
                enterButton
                onSearch={value => onLoadTimered(value)}
                onChange={(e) => {
                  onLoadTimered(e.target.value)
                }}
              />
            )
          }
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: usersLength,
            showSizeChanger: false,
            onChange: (page) => {
              onLoad('', 10, (page - 1) * 10);
            }
          }}
          loading={
            {
              spinning: loading,
              size: 'large',
            }
          }
          size='middle'
        />
      </div>

      <Modal
        title="Editar usuário"
        open={isModalOpen}
        footer={null}
        onCancel={handleClose}
        centered
      >
        <ProfileUpdate
          user={user as IUser}
          handleClose={handleClose}
          onLoad={onLoadDefault}
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
  usersLength: state.auth.usersLength,
  userCurrent: state.auth.user,
});

const mapDispatchToProps = {
  loadAllUsers,
  deleteUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ProfileList = connector(_ProfileList);

export { ProfileList };
