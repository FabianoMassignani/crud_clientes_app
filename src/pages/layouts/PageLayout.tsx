import { ReactNode } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export const PageLayout = (props: Props) => {
  const { children } = props;
  return (
    <Layout className="page-layout">
      <Content className="layout-children">{children}</Content>
    </Layout>
  );
};
