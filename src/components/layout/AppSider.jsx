import React from 'react';
import { Layout, Card, Statistic, List, Typography, Tag, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { strModificate } from '../../utils';
import { useCrypto } from '../../context';
import ConfirmDelete from '../ConfirmDelete';

const siderStyle = {
  padding: '1rem',
};

const AppSider = () => {
  const { assets, removeAsset } = useCrypto();

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.length ? (
        assets.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: '1rem' }}>
            <ConfirmDelete deleteCoin={() => removeAsset(asset)} asset={asset} />
            <Statistic
              title={strModificate(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? '#3f8600' : '#cf1322',
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: 'Total Profit',
                  value: +asset.totalProfit.toFixed(2) + '$',
                  tag: true,
                },
                {
                  title: 'Asset Amount',
                  value: +asset.amount.toFixed(2),
                },
                {
                  title: 'Date Added',
                  value: asset.date.toString().substring(0, 10),
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>

                  <Typography.Text
                    type={
                      item.title !== 'Asset Amount' && item.title !== 'Date Added'
                        ? asset.grow
                          ? 'success'
                          : 'danger'
                        : 'default'
                    }>
                    {item.tag && (
                      <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                    )}
                    {item.value}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        ))
      ) : (
        <Typography.Title level={2} style={{ color: '#fff' }}>
          The wallet is empty. To add a coin, click 'Add Coin'
        </Typography.Title>
      )}
    </Layout.Sider>
  );
};

export default AppSider;
