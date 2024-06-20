import { ReactNode } from 'react';
import { AppHeader } from '../../components/Header';

import { Layout } from 'antd';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const MainLayout = (props: Props) => {
  const { children } = props;

  return (
    <Layout className="main-layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="layout-children">{children}</Content>
    </Layout>
  );
};
