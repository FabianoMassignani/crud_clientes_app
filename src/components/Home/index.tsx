import { connect, ConnectedProps } from 'react-redux';
import { Login } from '../Auth/Login';
import ProfilePage from '../../pages/ProfilePages/ProfilePage';

interface Props extends ConnectedProps<typeof connector> { }

const _Home = (props: Props) => {
  const { isAuthenticated } = props;

  return <>{!isAuthenticated ? <Login /> : <ProfilePage />}</>;
};

const mapStateToProps = (state: AppState) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

const Home = connector(_Home);

export { Home };
