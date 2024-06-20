import { NavLink } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { logout } from '../../actions/Auth.thunks';
import { connect, ConnectedProps } from 'react-redux';
import { PATH } from '../../constants/paths';

interface Props extends ConnectedProps<typeof connector> { }

const _Menu = (props: Props) => {
  const { isAuthenticated, logout } = props;

  const authLinks = (
    <div
      className="header-menu"
      style={{
        display: 'flex',
        flex: 1,
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NavLink to={PATH.HOME} onClick={() => logout()}>
        <LoginOutlined style={{ fontSize: '25px' }} />
      </NavLink>
    </div>
  );

  return <>{isAuthenticated ? authLinks : null}</>;
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user as IUser,
});

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const NavMenu = connector(_Menu);

export { NavMenu };
