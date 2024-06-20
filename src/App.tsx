import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadUser, logout } from './actions/Auth.thunks';
import { RoutesApp } from './routes';

interface Props extends ConnectedProps<typeof connector> {}

const _App = (props: Props) => {
  useEffect(() => {
    const { loadUser, logout } = props;

    if (localStorage.user) {
      loadUser();
    }

    window.addEventListener('storage', () => {
      if (!localStorage.user) logout();
    });
  }, [props]);

  return <RoutesApp />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loadUser,
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const App = connector(_App);
