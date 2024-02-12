import React from 'react';

import { Layout, Spin } from 'antd';

import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppSider from './AppSider';
import { useCrypto } from '../../context';

const AppLayout = () => {
  const { loading } = useCrypto()

  if (loading) return <Spin fullscreen />;

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
