import React from 'react';
import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
};

const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, asset) => {
    acc[asset.id] = asset.price;
    return acc;
  }, {});

  const calcTotalPortfolio = () => {
    return assets
      .map((asset) => asset.amount * cryptoPriceMap[asset.id])
      .reduce((acc, val) => (acc += val), 0)
      .toFixed(2);
  };

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Postfolio: {calcTotalPortfolio()}$
      </Typography.Title>

      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};

export default AppContent;
