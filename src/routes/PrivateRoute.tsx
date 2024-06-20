import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

interface PrivateRouteProps {
  element: JSX.Element;
  path: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PrivateRouteProps & PropsFromRedux;

const PrivateRoute: FunctionComponent<Props> = ({
  isAuthenticated,
  element,
  path,
}) => {
  return isAuthenticated ? element : <Navigate to={path} />;
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PrivateRoute);
