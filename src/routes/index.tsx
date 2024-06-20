import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from '../constants/paths';
import { Loading } from '../components/Loading';
import PrivateRoute from './PrivateRoute';
import { MainLayout } from '../pages/layouts/MainLayout';
import HomePage from '../pages/HomePages/HomePage';
import LoginPage from '../pages/AuthPages/LoginPage';
import RegisterPage from '../pages/AuthPages/RegisterPage';
import ProfilePage from '../pages/ProfilePages/ProfilePage';
import NotFoundPage from '../pages/ErrorPages/404Pages';

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.REGISTER} element={<RegisterPage />} />

            <Route
              path={PATH.PROFILE}
              element={<PrivateRoute path={PATH.HOME} element={
                <ProfilePage />
              } />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};
